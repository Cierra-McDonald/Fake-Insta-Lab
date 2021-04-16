const User = require('../models/User');
const Posts = require('../models/Posts');
const Comment = require('../models/Comment')

module.exports = async ()=>{

  const newUser = await User.insert({
    username: 'test_user',
    photoUrl: 'http://avatar.com'
  })

 const newUser2 = await User.insert({
    username: 'test_user2',
    photoUrl: 'http://avatar.com'
  })

  

  const newPost = await Posts.create(newUser.username,'http://photo.com','coolbeans',
    )
  await Posts.create(newUser2.username,'http://photo.com','test post',
    )
  await Comment.create(newUser2.username, newPost.id, 'this is my first comment!') 
};