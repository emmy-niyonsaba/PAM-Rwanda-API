import ChatMessage from '../models/ChatMessage.js';
import User from '../models/User.js';

export const getChatMessages = async (req, res) => {
  try {
    const { chatType = 'general', sessionId } = req.query;
    const where = { chatType };

    if (sessionId && chatType === 'session') {
      where.sessionId = sessionId;
    }

    const messages = await ChatMessage.findAll({
      where,
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'profileImage'] }],
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    res.status(200).json({ messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const createChatMessage = async (req, res) => {
  try {
    const { content, chatType = 'general', sessionId } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const message = await ChatMessage.create({
      content,
      userId: req.user.userId,
      chatType,
      sessionId,
    });

    const messageWithUser = await ChatMessage.findByPk(message.id, {
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'profileImage'] }],
    });

    res.status(201).json({ message: messageWithUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
