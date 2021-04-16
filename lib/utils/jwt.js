const jwt = require('jsonwebtoken');

const sign = (payload) => { 
    return jwt.sign({...payload}, process.env.APP_SECRET, { 
        expiresIn: '24',
    });
};

const verify = (token) => { 
    return jwt.verify(token, process.env.APP_SECRET);
};

module.exports = { 
    sign,
    verify,
};

