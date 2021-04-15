const {Router} = require('express');

module.exports = Router()
  .post('/', async (req, res, next) =>{
    const data = req.body;

    res.send(data);
  })