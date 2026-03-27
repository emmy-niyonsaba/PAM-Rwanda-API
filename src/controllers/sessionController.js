import LearningSession from '../models/LearningSession.js';
import SessionProgress from '../models/SessionProgress.js';
import User from '../models/User.js';

export const getSessions = async (req, res) => {
  try {
    const sessions = await LearningSession.findAll({
      order: [['order', 'ASC']],
    });

    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await LearningSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const markSessionComplete = async (req, res) => {
  try {
    const { quizScore } = req.body;
    const session = await LearningSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    let progress = await SessionProgress.findOne({
      where: { userId: req.user.userId, sessionId: req.params.id },
    });

    if (!progress) {
      progress = await SessionProgress.create({
        userId: req.user.userId,
        sessionId: req.params.id,
        completed: true,
        quizScore,
      });
    } else {
      progress.completed = true;
      progress.quizScore = quizScore || progress.quizScore;
      await progress.save();
    }

    // Check if all sessions are completed
    const totalSessions = await LearningSession.count();
    const completedSessions = await SessionProgress.count({
      where: { userId: req.user.userId, completed: true },
    });

    if (completedSessions === totalSessions) {
      const user = await User.findByPk(req.user.userId);
      user.isMember = true;
      user.role = 'member';
      user.sessionsCompleted = completedSessions;
      await user.save();
    }

    res.status(200).json({ message: 'Session marked as complete', progress });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const progress = await SessionProgress.findAll({
      where: { userId: req.user.userId },
      include: [{ model: LearningSession, attributes: ['id', 'title', 'order'] }],
      order: [[LearningSession, 'order', 'ASC']],
    });

    res.status(200).json({ progress });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
