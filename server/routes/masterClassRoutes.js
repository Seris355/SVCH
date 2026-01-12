const express = require('express');
const router = express.Router();
const masterClassController = require('../controllers/masterClassController');


router.get('/', masterClassController.getAllMasterClasses);


router.get('/:id/exists', masterClassController.checkMasterClassExists);


router.get('/:id', masterClassController.getMasterClassById);


router.post('/', masterClassController.createMasterClass);


router.put('/:id', masterClassController.updateMasterClass);


router.delete('/:id', masterClassController.deleteMasterClass);

module.exports = router;

