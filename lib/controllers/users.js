const { Router } = require('express');
const User = require('../services/User');

module.exports = Router()
.get('/prolific', (req, res, next) => { 
    User.findProlificUsers()
        .then((user) => res.send(user))
        .catch(next);
})