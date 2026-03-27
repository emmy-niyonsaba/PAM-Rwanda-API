import Event from '../models/Event.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, country, category, capacity, image } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      country,
      category,
      capacity,
      image,
      createdBy: req.user.userId,
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { filter = 'all', country } = req.query;
    let where = {};
    const now = new Date();

    if (filter === 'upcoming') {
      where.date = { [Op.gte]: now };
    } else if (filter === 'thisweek') {
      const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      where.date = { [Op.between]: [now, weekEnd] };
    } else if (filter === 'thismonth') {
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      where.date = { [Op.between]: [now, monthEnd] };
    }

    if (country) {
      where.country = country;
    }

    const events = await Event.findAll({
      where,
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
      order: [['date', 'ASC']],
    });

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName', 'country'] }],
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ event });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(event, req.body);
    await event.save();

    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
