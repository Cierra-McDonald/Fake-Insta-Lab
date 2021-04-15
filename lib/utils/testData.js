const User = require('../models/User');
const Posts = require('../models/Posts');

module.exports = async ()=>{

  const newUser = await User.insert({
    username: 'test_user',
    photoUrl: 'http://avatar.com'
  })

  await Posts.create(newUser.username,'http://photo.com','coolbeans',
    )
  await Posts.create(newUser.username,'http://photo.com','test post',
    )
};