require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: "hlomla"
    }
]

app.get('/api/posts', authenticateToken, (req, res) => {
    console.log(req.body.user);
    res.json(posts.filter(post => post.username === req.body.user.name))
})

app.post('/api/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }
    req.user = user;
    console.log(req.user);

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        next()
    } catch(err) {
        console.log(err);
        if (err) return res.sendStatus(403)
        req.user = user
        next()
      }
}

app.listen(4017)
