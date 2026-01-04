const { Participant } = require('../models');
const { Op } = require('sequelize');

// Получить всех участников с пагинацией, сортировкой, фильтрацией и поиском
exports.getAllParticipants = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'ASC',
      search,
      email,
      phone,
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Фильтрация по email
    if (email) {
      where.email = {
        [Op.iLike]: `%${email}%`,
      };
    }

    // Фильтрация по телефону
    if (phone) {
      where.phone = {
        [Op.iLike]: `%${phone}%`,
      };
    }

    // Поиск по нескольким полям
    if (search) {
      where[Op.or] = [
        { fullName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Participant.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder.toUpperCase()]],
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
      message: 'Ошибка при получении списка участников',
      error: error.message,
    });
  }
};

// Получить участника по ID
exports.getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Участник не найден',
      });
    }

    res.json({
      success: true,
      data: participant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении участника',
      error: error.message,
    });
  }
};

// Проверить существование участника
exports.checkParticipantExists = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);

    res.json({
      success: true,
      exists: !!participant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при проверке существования участника',
      error: error.message,
    });
  }
};

// Создать нового участника
exports.createParticipant = async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    const participant = await Participant.create({
      fullName,
      email,
      phone,
    });

    res.status(201).json({
      success: true,
      message: 'Участник успешно создан',
      data: participant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ошибка при создании участника',
      error: error.message,
    });
  }
};

// Обновить участника
exports.updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;

    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Участник не найден',
      });
    }

    await participant.update({
      fullName,
      email,
      phone,
    });

    res.json({
      success: true,
      message: 'Участник успешно обновлен',
      data: participant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Ошибка при обновлении участника',
      error: error.message,
    });
  }
};

// Удалить участника
exports.deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;

    const participant = await Participant.findByPk(id);

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Участник не найден',
      });
    }

    await participant.destroy();

    res.json({
      success: true,
      message: 'Участник успешно удален',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при удалении участника',
      error: error.message,
    });
  }
};

