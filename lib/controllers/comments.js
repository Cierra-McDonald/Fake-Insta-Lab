const {Router} = require('express');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', async (req, res, next)=>{

    try {
         // const id = req.user
    const comment = req.body.comment
    const author = req.body.author
    const postId = req.body.postId
    const data = await Comment.create(author, postId, comment)

    res.send(data)
      
    } catch (err) {
      next(err)
    }
 

    
  })

  .delete('/:id', async (req, res, next) => { 
    try { 
      const request = await Comment.delete(req.params.id);
        res.send(request);
    } catch (err) { 
      next(err);
    }

  })

