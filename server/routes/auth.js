const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/users');
const crypto = require('crypto');

function generateAccessToken(email) {
    return jwt.sign({email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/register', async (req,res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!(email && lastName && firstName && password)) {
       return res.send({message: 'must provide all of the credentials to register'});
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = await bcrypt.hash(password, parseInt(crypto.randomBytes(32).toString('hex'), 16));
        const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: encryptedPassword
    });

    const token = generateAccessToken(email);
    return res.send({firstName, lastName, email, token});
    } catch(error) {
       return res.status(500).json({ message: error.message })
    }
});

router.post('/login', async(req,res) => {
    console.log('login!!')
    const { email, password } = req.body;
    if (!(email && password)) {
       return res.status(401).send({message: 'must provider email and password'});
    }
    try {
        const user = await User.findOne({email});
        console.log(user)
        if (!user) {
            return res.status(401).json({message: 'Username not found'});
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: 'invalid password'});
        }
        const token = generateAccessToken(email);
        user.token = token;
        return res.send({firstName: user.firstName, lastName: user.lastName, email: user.email, token});
    }catch(error){

        return res.status(500).json({ message: error.message })
    }
})

router.get('/logout', (req,res) => {
    req.user = null;
    return res.send(200);
})

module.exports = router;