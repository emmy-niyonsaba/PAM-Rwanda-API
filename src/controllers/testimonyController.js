import Testimony from '../models/Testimony.js';
import User from '../models/User.js';

export const createTestimony = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const testimony = await Testimony.create({
      content,
      userId: req.user.userId,
    });

    res.status(201).json({ message: 'Testimony submitted successfully', testimony });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getTestimonies = async (req, res) => {
  try {
    const { country, approved = true } = req.query;
    const where = { approved: true };

    if (country) {
      where.country = country;
    }

    const testimonies = await Testimony.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'country', 'profileImage'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ testimonies });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const approveTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByPk(req.params.id);

    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    testimony.approved = true;
    await testimony.save();

    res.status(200).json({ message: 'Testimony approved', testimony });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findByPk(req.params.id);

    if (!testimony) {
      return res.status(404).json({ message: 'Testimony not found' });
    }

    if (testimony.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await testimony.destroy();
    res.status(200).json({ message: 'Testimony deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
