import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Power = sequelize.define('Power', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true } // validation pour s'assurer que le nom n'est pas vide
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'powers',
  timestamps: true,    // createdAt et updatedAt
  underscored: true,   // colonnes en snake_case
});

export default Power;