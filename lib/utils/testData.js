const User = require('../services/User');
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
for (let i = 0; i < 2; i++) {
  const newUsers = await User.insert({
    username: faker.name.firstName() + i,
    photoUrl: `http://avatar.com${i}`
  })


  newUsersArr.push(newUsers.username)

  await Posts.create(newUsers.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers.username, faker.random.image(), faker.lorem.words(10),
  )
};

for (let i = 0; i < 5; i++) {
  const newUsers2 = await User.insert({
    username: faker.name.lastName() + i,
    photoUrl: `http://avatar.com${i}`
  })


  newUsersArr.push(newUsers2.username)

  await Posts.create(newUsers2.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers2.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers2.username, faker.random.image(), faker.lorem.words(10),
  )
};


for (let i = 0; i < 2; i++) {
  const newUsers3 = await User.insert({
    username: faker.name.middleName() + i,
    photoUrl: `http://avatar.com${i}`
  })


  newUsersArr.push(newUsers3.username)

  await Posts.create(newUsers3.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers3.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers3.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers3.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers3.username, faker.random.image(), faker.lorem.words(10),
  )
};

for (let i = 0; i < 10; i++) {
  const newUsers4 = await User.insert({
    username: faker.lorem.words(1) + i,
    photoUrl: `http://avatar.com${i}`
  })


  newUsersArr.push(newUsers4.username)

  await Posts.create(newUsers4.username, faker.random.image(), faker.lorem.words(10))
  await Posts.create(newUsers4.username, faker.random.image(), faker.lorem.words(10),
  )
};

const newUsers5 = await User.insert({
  username: 'Anthony-rosario',
  photoUrl: `http://avatar.com`
})

for (let i = 0; i < 100; i++) {
  await Posts.create(newUsers5.username, faker.random.image(), faker.lorem.words(10)
  )
};


for (let i = 0; i < 200; i++) {
  await Comment.create(testUser.username, Math.floor((Math.random() *10)+2), faker.lorem.words(10)) 
}


};
  

  // const newPost = await Posts.create(newUser.username,'http://photo.com','coolbeans'
  //   )

  // await Posts.create(newUser2.username,'http://photo.com','test post',
  //   )
  
  // await Comment.create(newUser2.username, newPost.id, 'this is my first comment!')


