const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Posts = require('../lib/models/Posts');
const seed = require('../lib/utils/testData');



describe('lab-13-fake-instagram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => { return seed(); }); 

  it('adds a post to the database', async ()=>{

    // const newUser = await User.insert({
    //   username: 'test_user',
    //   photoUrl: 'http://avatar.com'
    // })

    const res = await request(app)
    .post('/api/v1/posts')
    .send({
      user: 'test_user',
      photo_url: 'http://photo.com',
      caption: 'coolbeans',
      tags: null

    })
    expect(res.body).toEqual({
      id: expect.any(String),
      user: 'test_user',
      photoUrl: 'http://photo.com',
      caption: 'coolbeans',
      tags: null
    })
  })
  it('gets all posts from db', async()=>{
    // const newUser = await User.insert({
    //   username: 'test_user',
    //   photoUrl: 'http://avatar.com'
    // })

    // await Posts.create('test_user','http://photo.com','coolbeans',
    // )
    // await Posts.create('test_user','http://photo.com','test post',
    // )
    const res = await request(app)
    .get('/api/v1/posts')

    expect(res.body).toEqual([{
      id: expect.any(String),
      user: 'test_user',
      photoUrl: 'http://photo.com',
      caption: 'coolbeans',
      tags: null

    },
    {
      id: expect.any(String),
      user: 'test_user',
      photoUrl: 'http://photo.com',
      caption: 'test post',
      tags: null

    }])
  })
  it('gets a post by id', async ()=>{
    const res = await request(app)
    .get('/api/v1/posts/1')
  })
});
