import AfricanHistory from '../models/AfricanHistory.js';

export const getHistories = async (req, res) => {
  try {
    const { country, era } = req.query;
    let where = {};

    if (country) where.country = country;
    if (era) where.era = era;

    const histories = await AfricanHistory.findAll({
      where,
      order: [['year', 'ASC']],
    });

    res.status(200).json({ histories });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const history = await AfricanHistory.findByPk(req.params.id);

    if (!history) {
      return res.status(404).json({ message: 'History not found' });
    }

    res.status(200).json({ history });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const createHistory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, content, country, era, image, year } = req.body;
    const history = await AfricanHistory.create({
      title,
      content,
      country,
      era,
      image,
      year,
    });

    res.status(201).json({ message: 'History created', history });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
