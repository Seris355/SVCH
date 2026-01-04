const sequelize = require('../config/database');
const Instructor = require('./Instructor');
const Participant = require('./Participant');
const MasterClass = require('./MasterClass');

// Определение связей между моделями

// Инструктор имеет много мастер-классов
Instructor.hasMany(MasterClass, {
  foreignKey: 'instructorId',
  as: 'masterClasses',
});

// Мастер-класс принадлежит одному инструктору
MasterClass.belongsTo(Instructor, {
  foreignKey: 'instructorId',
  as: 'instructor',
});

module.exports = {
  sequelize,
  Instructor,
  Participant,
  MasterClass,
};

