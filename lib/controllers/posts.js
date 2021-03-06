const {Router} = require('express');
const PostService = require('../services/PostService.js');
const ensureAuth = require('../middleware/ensureAuth');


module.exports = Router()
  .post('/', ensureAuth, async (req, res, next) =>{
    const user = req.user.username;
    const photoUrl = req.body.photo_url;
    const caption = req.body.caption;

    PostService.create(user, photoUrl, caption)
      
      .then((data) => res.send(data))
      .catch(next);
  })

  .get('/', async (req, res, next) => {
    PostService.getAll()
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/popular',async (req, res, next) => {
    PostService.getPopular()
    .then((post) => res.send(post))
    .catch(next);
})

  .get('/:id', async (req, res, next) => {
    PostService.getById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })



  .patch('/:id', ensureAuth, async (req, res, next) => {
    const caption = req.body.caption;
    PostService.updateById(req.params.id, caption, req.user.username)
      .then((post) => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, async (req, res, next) => {
    PostService.destroy(req.params.id, req.user.username)
      .then((post) => res.send(post))
      .catch(next);
  })