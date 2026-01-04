const { sequelize, Instructor, Participant, MasterClass } = require('../models');

async function resetDatabase() {
  try {
    // Проверка подключения к базе данных
    await sequelize.authenticate();
    console.log('✓ Подключение к базе данных установлено.');

    // Удаление всех таблиц и их пересоздание
    // ВНИМАНИЕ: Это удалит все данные!
    await sequelize.sync({ force: true });
    console.log('✓ База данных полностью пересоздана.');

    console.log('✓ База данных успешно сброшена!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Ошибка при сбросе базы данных:', error);
    process.exit(1);
  }
}

resetDatabase();

