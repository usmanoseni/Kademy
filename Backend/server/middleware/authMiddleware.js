// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ 
            success: false,
            error: "Unauthorized - Please login first" 
        });
    }
    next();
};

module.exports = { requireAuth };
