import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Character = sequelize.define('Character', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: true
  },
  universe: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  first_appearance: {
    type: DataTypes.STRING,
    allowNull: true
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'characters',
  timestamps: true,      // createdAt et updatedAt
  underscored: true,     // colonnes en snake_case
});

export default Character;