const Book = require('../models/book');
const redisClient = require('../services/redisClient'); 


const getAllBooks = async (req, res) => {
    try {
        const cacheKey = 'books'; 
        const cachedBooks = await redisClient.get(cacheKey);

        if (cachedBooks) {
            return res.status(200).json({
                status: 200,
                source: 'cache',
                data: JSON.parse(cachedBooks),
            });
        }
        const books = await Book.find();
        await redisClient.set(cacheKey, JSON.stringify(books), 'EX', 60);

        return res.status(200).json({
            status: 200,
            source: 'database',
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        await redisClient.del('books');

        return res.status(201).json({
            status: 201,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        await redisClient.del('books');

        if (!book) {
            return res.status(404).json({
                status: 404,
                error: 'Book not found',
            });
        }

        return res.status(200).json({
            status: 200,
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);


        await redisClient.del('books');

        if (!book) {
            return res.status(404).json({
                status: 404,
                error: 'Book not found',
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
};
