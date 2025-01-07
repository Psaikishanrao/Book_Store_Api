const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); 
        res.status(200).json({
            status: 200,
            message: 'Books fetched successfully.',
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'An error occurred while fetching books.',
        });
    }
};

const createBook = async (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            status: 400,
            error: 'Invalid input: title and author are required.',
        });
    }

    try {
        const newBook = new Book({ title, author });
        await newBook.save(); 
        res.status(201).json({
            status: 201,
            message: 'Book created successfully.',
            data: newBook,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'An error occurred while creating the book.',
        });
    }
};

const updateBook = async (req, res) => {
    const { title, author } = req.body;
    const { id } = req.params;

    if (!title && !author) {
        return res.status(400).json({
            status: 400,
            error: 'Invalid input: Provide title or author to update.',
        });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author },
            { new: true, runValidators: true } 
        );
        if (!updatedBook) {
            return res.status(404).json({
                status: 404,
                error: 'Book not found.',
            });
        }
        res.status(200).json({
            status: 200,
            message: `Book with ID ${id} updated successfully.`,
            data: updatedBook,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'An error occurred while updating the book.',
        });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({
                status: 404,
                error: 'Book not found.',
            });
        }
        res.status(200).json({
            status: 200,
            message: `Book with ID ${id} deleted successfully.`,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: 'An error occurred while deleting the book.',
        });
    }
};

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
};
