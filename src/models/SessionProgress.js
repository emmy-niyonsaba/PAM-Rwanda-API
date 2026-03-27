import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import LearningSession from './LearningSession.js';

const SessionProgress = sequelize.define('SessionProgress', {
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
  sessionId: {
    type: DataTypes.UUID,
    references: { model: 'LearningSessions', key: 'id' },
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  quizScore: {
    type: DataTypes.INTEGER,
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

SessionProgress.belongsTo(User, { foreignKey: 'userId' });
SessionProgress.belongsTo(LearningSession, { foreignKey: 'sessionId' });

export default SessionProgress;
