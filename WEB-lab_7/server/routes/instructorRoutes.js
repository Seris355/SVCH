const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Получить всех инструкторов (с пагинацией, сортировкой, фильтрацией, поиском)
router.get('/', instructorController.getAllInstructors);

// Проверить существование инструктора
router.get('/:id/exists', instructorController.checkInstructorExists);

// Получить инструктора по ID
router.get('/:id', instructorController.getInstructorById);

// Создать нового инструктора
router.post('/', instructorController.createInstructor);

// Обновить инструктора
router.put('/:id', instructorController.updateInstructor);

// Удалить инструктора
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router;

