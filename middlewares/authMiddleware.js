

const authMiddleware = (req, res, next) => {
    const userId = req.headers['x-user-id'];//mock implementation or mock id
    const role = req.headers['x-role'];

    if (!userId || !role) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized: Missing userId or role in headers.',
        });
    }

    req.user = { id: userId, role }; 
    next();
};

module.exports = authMiddleware;
