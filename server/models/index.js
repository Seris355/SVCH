const sequelize = require('../config/database');
const Instructor = require('./Instructor');
const Participant = require('./Participant');
const MasterClass = require('./MasterClass');




Instructor.hasMany(MasterClass, {
  foreignKey: 'instructorId',
  as: 'masterClasses',
});


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

