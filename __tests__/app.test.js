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
      user: 'test_user2',
      photoUrl: 'http://photo.com',
      caption: 'test post',
      tags: null

    }])
  })
  it('gets a post by id', async ()=>{
    const res = await request(app)
    .get('/api/v1/posts/1')
    expect(res.body).toEqual({
      id: expect.any(String),
      user: 'test_user',
      photoUrl: 'http://photo.com',
      caption: 'coolbeans',
      tags: null

    })
  })
  it('upates the post caption', async()=>{
    const res = await request(app)
    
    .patch('/api/v1/posts/2')
    .send({caption: 'caption is updated'})

    expect(res.body).toEqual({
      caption: 'caption is updated',
    })
  })
  it('deletes a post', async ()=>{
    const res = await request(app)
    .delete('/api/v1/posts/2')

    expect(res.body).toEqual({
      id: expect.any(String),
      user: 'test_user2',
      photoUrl: 'http://photo.com',
      caption: 'test post',
      tags: null

    })
  })
  it('it adds a comment to a post', async ()=>{
    const res = await request(app)
    .post('/api/v1/comments')
    .send({
      comment: 'I commented on your post',
      author: 'test_user2',
      postId: '1',
    })

    expect(res.body).toEqual({
      id: expect.any(String),
      comment: 'I commented on your post',
      author: 'test_user2',
      postId: '1',
    })
  })
  it('should delete a comment by the id', async () => { 
    const res = await request(app)
      .delete('/api/v1/comments/1')

      expect(res.body).toEqual({comment: 'this is my first comment!'})
  })

});
