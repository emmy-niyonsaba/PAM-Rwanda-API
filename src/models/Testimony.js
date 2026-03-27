import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Testimony = sequelize.define('Testimony', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: { model: 'Users', key: 'id' },
    allowNull: false,
  },
  approved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

Testimony.belongsTo(User, { foreignKey: 'userId' });

export default Testimony;
