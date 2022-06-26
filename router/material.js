const router = require('express').Router();
const { getAllMaterial, getById, material } = require('../controller/material');

// get all character

router.post('/find/', getById);
router.get('/all', getAllMaterial);
router.post('/', material);

module.exports = router;
