const express = require('express');
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();


router.get('/', roleMiddleware(['Admin', 'User']), getAllBooks);
router.post('/', roleMiddleware(['Admin']), createBook);
router.put('/:id', roleMiddleware(['Admin']), updateBook); 
router.delete('/:id', roleMiddleware(['Admin']), deleteBook); 

module.exports = router;
