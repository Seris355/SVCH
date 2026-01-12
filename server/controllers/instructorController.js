const { Instructor } = require('../models');
const { Op } = require('sequelize');

// Получить всех инструкторов с пагинацией, сортировкой, фильтрацией и поиском
exports.getAllInstructors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'ASC',
      search,
      specialization,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Фильтрация по специализации
    if (specialization) {
      where.specialization = {
        [Op.iLike]: `%${specialization}%`,
      };
    }

    // Поиск по нескольким полям
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.iLike]: `%${search}%` } },
        { specialization: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Валидация и ограничение сортировки
    const allowedSortFields = ['id', 'fullName'];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'id';

    const { count, rows } = await Instructor.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[validSortBy, sortOrder.toUpperCase()]],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении списка инструкторов',
      error: error.message,
    });
  }
};

// Получить инструктора по ID
exports.getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Инструктор не найден',
      });
    }

    res.json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении инструктора',
      error: error.message,
    });
  }
};

// Проверить существование инструктора
exports.checkInstructorExists = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByPk(id);

    res.json({
      success: true,
      exists: !!instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при проверке существования инструктора',
      error: error.message,
    });
  }
};

// Создать нового инструктора
exports.createInstructor = async (req, res) => {
  try {
    const { fullName, specialization } = req.body;

    const instructor = await Instructor.create({
      fullName,
      specialization,
    });

    res.status(201).json({
      success: true,
      message: 'Инструктор успешно создан',
      data: instructor,
    });
  } catch (error) {
    // Обработка ошибок валидации Sequelize
    if (error.name === 'SequelizeValidationError') {
      let errorMessages = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
      // Убираем префикс "Validation error: " если он есть
      errorMessages = errorMessages.replace(/^Validation error:\s*/i, '');
      return res.status(400).json({
        success: false,
        message: errorMessages,
        error: errorMessages,
      });
    }
    
    // Обработка ошибок уникальности
    if (error.name === 'SequelizeUniqueConstraintError') {
      let errorMessage = 'Нарушение уникальности данных';
      if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors.map(e => e.message).join(', ');
      }
      return res.status(400).json({
        success: false,
        message: errorMessage,
        error: errorMessage,
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Ошибка при создании инструктора',
      error: error.message,
    });
  }
};

// Обновить инструктора
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, specialization } = req.body;

    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Инструктор не найден',
      });
    }

    await instructor.update({
      fullName,
      specialization,
    });

    res.json({
      success: true,
      message: 'Инструктор успешно обновлен',
      data: instructor,
    });
  } catch (error) {
    // Обработка ошибок валидации Sequelize
    if (error.name === 'SequelizeValidationError') {
      let errorMessages = error.errors ? error.errors.map(e => e.message).join(', ') : error.message;
      // Убираем префикс "Validation error: " если он есть
      errorMessages = errorMessages.replace(/^Validation error:\s*/i, '');
      return res.status(400).json({
        success: false,
        message: errorMessages,
        error: errorMessages,
      });
    }
    
    // Обработка ошибок уникальности
    if (error.name === 'SequelizeUniqueConstraintError') {
      let errorMessage = 'Нарушение уникальности данных';
      if (error.errors && error.errors.length > 0) {
        errorMessage = error.errors.map(e => e.message).join(', ');
      }
      return res.status(400).json({
        success: false,
        message: errorMessage,
        error: errorMessage,
      });
    }
    
    res.status(400).json({
      success: false,
      message: 'Ошибка при обновлении инструктора',
      error: error.message,
    });
  }
};

// Удалить инструктора
exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Инструктор не найден',
      });
    }

    // Проверка использования инструктора в мастер-классах
    const { MasterClass } = require('../models');
    const masterClassesCount = await MasterClass.count({
      where: { instructorId: id },
    });

    if (masterClassesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Невозможно удалить инструктора. Он используется в ${masterClassesCount} мастер-классах. Сначала удалите или измените связанные мастер-классы.`,
      });
    }

    await instructor.destroy();

    res.json({
      success: true,
      message: 'Инструктор успешно удален',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении инструктора',
      error: error.message,
    });
  }
};

