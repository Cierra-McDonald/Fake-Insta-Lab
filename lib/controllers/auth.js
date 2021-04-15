const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router() 
    .get('/login', (req, res) => { 
        res.redirect(
            `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scopes=read:user`
        );
    })

    .get('/login/callback', (req, res, next) => { 
        // http://localhost:7890/api/v1/auth/login/callback?code=1e601da3fc36dda63863
        UserService.create(req.query.code)
            .then((user) => res.send(user))
            .catch(next);
    })

