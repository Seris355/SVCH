const express = require('express');
const router = express.Router();
const masterClassController = require('../controllers/masterClassController');

// Получить все мастер-классы (с пагинацией, сортировкой, фильтрацией, поиском)
router.get('/', masterClassController.getAllMasterClasses);

// Проверить существование мастер-класса
router.get('/:id/exists', masterClassController.checkMasterClassExists);

// Получить мастер-класс по ID
router.get('/:id', masterClassController.getMasterClassById);

// Создать новый мастер-класс
router.post('/', masterClassController.createMasterClass);

// Обновить мастер-класс
router.put('/:id', masterClassController.updateMasterClass);

// Удалить мастер-класс
router.delete('/:id', masterClassController.deleteMasterClass);

module.exports = router;

