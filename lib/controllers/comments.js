const {Router} = require('express');
const Comment = require('../models/Comment');
const ensureAuth = require('../middleware/ensureAuth');


module.exports = Router()
  .post('/', ensureAuth, async (req, res, next)=>{

    try {
         // const id = req.user
    const comment = req.body.comment
    const author = req.user.username
    const postId = req.body.postId
    const data = await Comment.create(author, postId, comment)

    res.send(data)
      
    } catch (err) {
      next(err)
    }
 

    
  })

  .get('/', async (req, res, next) => {
    Comment.getAll()
      .then((response) => res.send(response))
      .catch(next);
  })

  .delete('/:id', ensureAuth, async (req, res, next) => { 
    try { 
      const request = await Comment.delete(req.params.id);
        res.send(request);
    } catch (err) { 
      next(err);
    }

  })

