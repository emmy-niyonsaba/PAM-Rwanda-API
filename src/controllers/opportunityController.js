import Opportunity from '../models/Opportunity.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

export const createOpportunity = async (req, res) => {
  try {
    const { title, description, type, country, organization, link, deadline, salary } = req.body;

    const opportunity = await Opportunity.create({
      title,
      description,
      type,
      country,
      organization,
      link,
      deadline,
      salary,
      createdBy: req.user.userId,
    });

    res.status(201).json({ message: 'Opportunity created successfully', opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const { type, country, organization } = req.query;
    let where = {};

    if (type) {
      where.type = type;
    }

    if (country) {
      where.country = country;
    }

    if (organization) {
      where.organization = { [Op.iLike]: `%${organization}%` };
    }

    const opportunities = await Opportunity.findAll({
      where,
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ opportunities });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
    });

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.status(200).json(opportunity);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, country, organization, link, deadline, salary } = req.body;

    const opportunity = await Opportunity.findByPk(id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.createdBy !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await opportunity.update({
      title,
      description,
      type,
      country,
      organization,
      link,
      deadline,
      salary,
    });

    res.status(200).json({ message: 'Opportunity updated successfully', opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (opportunity.createdBy !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await opportunity.destroy();

    res.status(200).json({ message: 'Opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
