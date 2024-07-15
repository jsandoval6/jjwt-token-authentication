const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const user = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    } catch(_) {
        res.sendStatus(403)
    }
    
}

module.exports = {
   authenticateToken
}