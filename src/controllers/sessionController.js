import User from '../models/User.js';

// In-memory storage for sessions (replace with database model later if needed)
const sessions = [];

export const getSessions = async (req, res) => {
  try {
    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = sessions.find(s => s.id === id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const completeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;

    const session = sessions.find(s => s.id === id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    session.completed = true;
    session.feedback = feedback;
    session.completedAt = new Date();

    res.status(200).json({ message: 'Session completed successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userSessions = sessions.filter(s => s.userId === userId);
    const completedSessions = userSessions.filter(s => s.completed);

    const progress = {
      userId,
      totalSessions: userSessions.length,
      completedSessions: completedSessions.length,
      progress: userSessions.length > 0 ? (completedSessions.length / userSessions.length) * 100 : 0,
      sessions: userSessions,
    };

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
