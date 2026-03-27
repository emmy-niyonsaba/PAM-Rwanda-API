import Panafricanist from '../models/Panafricanist.js';

export const getPanafricanists = async (req, res) => {
  try {
    const { country } = req.query;
    let where = {};

    if (country) where.country = country;

    const panafricanists = await Panafricanist.findAll({
      where,
      order: [['birthYear', 'DESC']],
    });

    res.status(200).json({ panafricanists });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getPanafricanistById = async (req, res) => {
  try {
    const panafricanist = await Panafricanist.findByPk(req.params.id);

    if (!panafricanist) {
      return res.status(404).json({ message: 'Panafricanist not found' });
    }

    res.status(200).json({ panafricanist });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const createPanafricanist = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name, biography, contributions, country, birthYear, deathYear, image, era } = req.body;
    const panafricanist = await Panafricanist.create({
      name,
      biography,
      contributions,
      country,
      birthYear,
      deathYear,
      image,
      era,
    });

    res.status(201).json({ message: 'Panafricanist created', panafricanist });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
