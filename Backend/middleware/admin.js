module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send({
        message: 'Access denied. User is not allowed to access this endpoint'
    });

    next();
};