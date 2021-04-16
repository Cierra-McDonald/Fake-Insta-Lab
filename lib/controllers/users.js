const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().get('/:id/posts', (req, res, next) => { 
    User.findProlificUsers(req.params.id)
        .then((user) => res.send(user))
        .catch(next);
})