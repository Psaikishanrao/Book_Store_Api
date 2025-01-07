const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-role']; 

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                status: 403,
                error: 'Forbidden: You do not have access to this resource.',
            });
        }

        next(); 
    };
};

module.exports = roleMiddleware;
