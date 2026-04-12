// In-memory storage for chat messages (replace with database later if needed)
const chatMessages = [];

export const getMessages = async (req, res) => {
  try {
    const { room = 'general', limit = 50 } = req.query;

    // Filter messages by room and return latest
    const messages = chatMessages
      .filter(msg => msg.room === room)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
      .reverse();

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content, room = 'general' } = req.body;
    const userId = req.user.userId;

    if (!content) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const message = {
      id: Date.now().toString(),
      userId,
      content,
      room,
      timestamp: new Date(),
    };

    chatMessages.push(message);

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
