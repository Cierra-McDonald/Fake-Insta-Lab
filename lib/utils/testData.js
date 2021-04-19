const User = require('../models/User');
const Posts = require('../models/Posts');
const Comment = require('../models/Comment')
const faker = require('faker')

module.exports = async ()=>{

 const testUser = await User.insert( { 
    username: 'test_user',
    photoUrl: 'http://photo.com',
  }
 )
 await Posts.create(testUser.username, faker.random.image(), faker.lorem.words(10) )

 
 await Posts.create(testUser.username, faker.random.image(), faker.lorem.words(10) )
 
 await Comment.create(testUser.username, 2, faker.lorem.words(10)) 

let newUsersArr = [];
for (let i = 0; i < 100; i++) {
  const newUsers = await User.insert({
    username: faker.name.firstName() + i,
    photoUrl: `http://avatar.com${i}`
  })

  newUsersArr.push(newUsers.username)

  await Posts.create(newUsers.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers.username, faker.random.image(), faker.lorem.words(10),
  )
};


for (let i = 0; i < 200; i++) {
  await Comment.create(testUser.username, Math.floor((Math.random() *25)+2), faker.lorem.words(10)) 
}


};
  

  // const newPost = await Posts.create(newUser.username,'http://photo.com','coolbeans'
  //   )

  // await Posts.create(newUser2.username,'http://photo.com','test post',
  //   )
  
  // await Comment.create(newUser2.username, newPost.id, 'this is my first comment!')


