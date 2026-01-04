const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Instructor = sequelize.define('Instructor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'ФИО не может быть пустым',
      },
      len: {
        args: [2, 100],
        msg: 'ФИО должно содержать от 2 до 100 символов',
      },
    },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Специализация не может быть пустой',
      },
      len: {
        args: [2, 200],
        msg: 'Специализация должна содержать от 2 до 200 символов',
      },
    },
  },
}, {
  tableName: 'instructors',
  timestamps: true,
});

module.exports = Instructor;

