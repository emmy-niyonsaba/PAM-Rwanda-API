import Opportunity from '../models/Opportunity.js';
import { Op } from 'sequelize';

export const getOpportunities = async (req, res) => {
  try {
    const { type, country } = req.query;
    let where = {};

    if (type) where.type = type;
    if (country) where.country = country;
    where.deadline = { [Op.gte]: new Date() };

    const opportunities = await Opportunity.findAll({
      where,
      order: [['deadline', 'ASC']],
    });

    res.status(200).json({ opportunities });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByPk(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    res.status(200).json({ opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const createOpportunity = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, description, type, country, organization, link, deadline, image } = req.body;
    const opportunity = await Opportunity.create({
      title,
      description,
      type,
      country,
      organization,
      link,
      deadline,
      image,
    });

    res.status(201).json({ message: 'Opportunity created', opportunity });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
