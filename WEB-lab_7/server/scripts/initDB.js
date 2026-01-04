const { sequelize, Instructor, Participant, MasterClass } = require('../models');

async function initDatabase() {
  try {
    // Проверка подключения к базе данных
    await sequelize.authenticate();
    console.log('✓ Подключение к базе данных установлено.');

    // Синхронизация моделей с базой данных
    // force: false - не удаляет существующие таблицы
    // alter: true - обновляет структуру таблиц при изменениях
    await sequelize.sync({ alter: true });
    console.log('✓ Модели синхронизированы с базой данных.');

    console.log('✓ База данных успешно инициализирована!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Ошибка при инициализации базы данных:', error);
    process.exit(1);
  }
}

initDatabase();

