const {Router} = require('express');
const PostService = require('../services/PostService.js');


module.exports = Router()
  .post('/', async (req, res, next) =>{
    const user = req.body.user;
    const photoUrl = req.body.photo_url;
    const caption = req.body.caption;

    console.log(req.body);

    PostService.create(user, photoUrl, caption)
      
      .then((data) => res.send(data))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    PostService.getAll()
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/:id', async (req, res, next) => {
    PostService.getById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', async (req, res, next) => {
    const caption = req.body.caption;
    PostService.updateById(req.params.id, caption)
      .then((post) => res.send(post))
      .catch(next);
  })

  .delete('/:id', async (req, res, next) => {
    PostService.destroy(req.params.id)
      .then((post) => res.send(post))
      .catch(next);
  })