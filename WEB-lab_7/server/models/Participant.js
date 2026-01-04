const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participant = sequelize.define('Participant', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Некорректный формат email',
      },
      notEmpty: {
        msg: 'Email не может быть пустым',
      },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Телефон не может быть пустым',
      },
      len: {
        args: [10, 20],
        msg: 'Телефон должен содержать от 10 до 20 символов',
      },
    },
  },
}, {
  tableName: 'participants',
  timestamps: true,
});

module.exports = Participant;

