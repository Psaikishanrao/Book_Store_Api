
const getAllBooks = (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Books fetched successfully.',
        data: [], 
    });
};


const createBook = (req, res) => {
    res.status(201).json({
        status: 201,
        message: 'Book created successfully.',
    });
};

module.exports = {
    getAllBooks,
    createBook,
};
