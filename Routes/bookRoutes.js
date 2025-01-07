

const express = require('express');
const { getAllBooks, createBook } = require('../controllers/bookController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();


router.get('/', roleMiddleware(['Admin', 'User']), getAllBooks);


router.post('/', roleMiddleware(['Admin']), createBook);

module.exports = router;

