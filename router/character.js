const router = require('express').Router();
const { view, store, filtering } = require('../controller/character');

// get all character
router.get('/', view);
router.get('/:id', filtering);
router.post('/all', store);

module.exports = router;
