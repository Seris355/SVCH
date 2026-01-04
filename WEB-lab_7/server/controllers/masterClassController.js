const { MasterClass, Instructor, Participant } = require('../models');
const { Op } = require('sequelize');

// Получить все мастер-классы с пагинацией, сортировкой, фильтрацией и поиском
exports.getAllMasterClasses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'ASC',
      search,
      instructorId,
      minPrice,
      maxPrice,
      dateFrom,
      dateTo,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Фильтрация по инструктору
    if (instructorId) {
      where.instructorId = parseInt(instructorId);
    }

    // Фильтрация по цене
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price[Op.gte] = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price[Op.lte] = parseFloat(maxPrice);
      }
    }

    // Фильтрация по дате
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) {
        where.date[Op.gte] = new Date(dateFrom);
      }
      if (dateTo) {
        where.date[Op.lte] = new Date(dateTo);
      }
    }

    // Поиск по нескольким полям
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await MasterClass.findAndCountAll({
      where,
      include: [
        {
          model: Instructor,
          as: 'instructor',
          attributes: ['id', 'fullName', 'specialization'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    // Получаем данные участников для каждого мастер-класса
    const masterClassesWithParticipants = await Promise.all(
      rows.map(async (masterClass) => {
        const participantIds = masterClass.participantIds || [];
        const participants = participantIds.length > 0
          ? await Participant.findAll({
              where: { id: { [Op.in]: participantIds } },
              attributes: ['id', 'fullName', 'email', 'phone'],
            })
          : [];

        return {
          ...masterClass.toJSON(),
          participants,
        };
      })
    );

    res.json({
      success: true,
      data: masterClassesWithParticipants,
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
      message: 'Ошибка при получении списка мастер-классов',
      error: error.message,
    });
  }
};

// Получить мастер-класс по ID
exports.getMasterClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const masterClass = await MasterClass.findByPk(id, {
      include: [
        {
          model: Instructor,
          as: 'instructor',
          attributes: ['id', 'fullName', 'specialization'],
        },
      ],
    });

    if (!masterClass) {
      return res.status(404).json({
        success: false,
        message: 'Мастер-класс не найден',
      });
    }

    // Получаем данные участников
    const participantIds = masterClass.participantIds || [];
    const participants = participantIds.length > 0
      ? await Participant.findAll({
          where: { id: { [Op.in]: participantIds } },
          attributes: ['id', 'fullName', 'email', 'phone'],
        })
      : [];

    res.json({
      success: true,
      data: {
        ...masterClass.toJSON(),
        participants,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении мастер-класса',
      error: error.message,
    });
  }
};

// Проверить существование мастер-класса
exports.checkMasterClassExists = async (req, res) => {
  try {
    const { id } = req.params;
    const masterClass = await MasterClass.findByPk(id);

    res.json({
      success: true,
      exists: !!masterClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при проверке существования мастер-класса',
      error: error.message,
    });
  }
};

// Создать новый мастер-класс
exports.createMasterClass = async (req, res) => {
  try {
    const { name, description, price, date, photo, instructorId, participantIds } = req.body;

    // Проверка существования инструктора
    const instructor = await Instructor.findByPk(instructorId);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: 'Инструктор не найден',
      });
    }

    // Проверка существования участников
    if (participantIds && participantIds.length > 0) {
      const participants = await Participant.findAll({
        where: { id: { [Op.in]: participantIds } },
      });
      if (participants.length !== participantIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Один или несколько участников не найдены',
        });
      }
    }

    const masterClass = await MasterClass.create({
      name,
      description,
      price,
      date,
      photo,
      instructorId,
      participantIds: participantIds || [],
    });

    const createdMasterClass = await MasterClass.findByPk(masterClass.id, {
      include: [
        {
          model: Instructor,
          as: 'instructor',
          attributes: ['id', 'fullName', 'specialization'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Мастер-класс успешно создан',
      data: createdMasterClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ошибка при создании мастер-класса',
      error: error.message,
    });
  }
};

// Обновить мастер-класс
exports.updateMasterClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, date, photo, instructorId, participantIds } = req.body;

    const masterClass = await MasterClass.findByPk(id);

    if (!masterClass) {
      return res.status(404).json({
        success: false,
        message: 'Мастер-класс не найден',
      });
    }

    // Проверка существования инструктора
    if (instructorId) {
      const instructor = await Instructor.findByPk(instructorId);
      if (!instructor) {
        return res.status(404).json({
          success: false,
          message: 'Инструктор не найден',
        });
      }
    }

    // Проверка существования участников
    if (participantIds && participantIds.length > 0) {
      const participants = await Participant.findAll({
        where: { id: { [Op.in]: participantIds } },
      });
      if (participants.length !== participantIds.length) {
        return res.status(400).json({
          success: false,
          message: 'Один или несколько участников не найдены',
        });
      }
    }

    await masterClass.update({
      name,
      description,
      price,
      date,
      photo,
      instructorId,
      participantIds: participantIds !== undefined ? participantIds : masterClass.participantIds,
    });

    const updatedMasterClass = await MasterClass.findByPk(id, {
      include: [
        {
          model: Instructor,
          as: 'instructor',
          attributes: ['id', 'fullName', 'specialization'],
        },
      ],
    });

    res.json({
      success: true,
      message: 'Мастер-класс успешно обновлен',
      data: updatedMasterClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ошибка при обновлении мастер-класса',
      error: error.message,
    });
  }
};

// Удалить мастер-класс
exports.deleteMasterClass = async (req, res) => {
  try {
    const { id } = req.params;

    const masterClass = await MasterClass.findByPk(id);

    if (!masterClass) {
      return res.status(404).json({
        success: false,
        message: 'Мастер-класс не найден',
      });
    }

    await masterClass.destroy();

    res.json({
      success: true,
      message: 'Мастер-класс успешно удален',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении мастер-класса',
      error: error.message,
    });
  }
};

