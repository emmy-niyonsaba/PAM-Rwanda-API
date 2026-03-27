import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: 'Users', key: 'id' },
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chatType: {
    type: DataTypes.ENUM('general', 'session'),
    defaultValue: 'general',
  },
  sessionId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

ChatMessage.belongsTo(User, { foreignKey: 'userId' });

export default ChatMessage;
