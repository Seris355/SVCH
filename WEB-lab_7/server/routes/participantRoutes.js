const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

// Получить всех участников (с пагинацией, сортировкой, фильтрацией, поиском)
router.get('/', participantController.getAllParticipants);

// Проверить существование участника
router.get('/:id/exists', participantController.checkParticipantExists);

// Получить участника по ID
router.get('/:id', participantController.getParticipantById);

// Создать нового участника
router.post('/', participantController.createParticipant);

// Обновить участника
router.put('/:id', participantController.updateParticipant);

// Удалить участника
router.delete('/:id', participantController.deleteParticipant);

module.exports = router;

