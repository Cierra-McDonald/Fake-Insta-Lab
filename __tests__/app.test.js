const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/services/User');
const Posts = require('../lib/models/Posts');
const seed = require('../lib/utils/testData');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => { 
  req.user = { 
    username: 'test_user',
    photoUrl: 'http://photo.com',
  };

  next();
});



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


    expect(res.body).toEqual(expect.any(Array))
  })

  it('gets a post by id', async ()=>{
    const res = await request(app)
    .get('/api/v1/posts/1')
    expect(res.body).toEqual({

      comments: expect.any(Array),
      user: expect.any(String),
      photoUrl: expect.any(String),
      caption: expect.any(String)
    })
  })

  it('updates the post caption', async()=>{
    const res = await request(app)
    .patch('/api/v1/posts/2')
    .send({caption: 'caption is updated'})

    expect(res.body).toEqual({
      caption: 'caption is updated',
    })
  })

  it('deletes a post', async ()=>{
    const res = await request(app)
    .delete('/api/v1/posts/1')

    expect(res.body).toEqual({
      id: expect.any(String),
      user: expect.any(String),
      photoUrl: expect.any(String),
      caption: expect.any(String),
      tags: null
    })
  })

  it('it adds a comment to a post', async ()=>{
    const res = await request(app)
    .post('/api/v1/comments')
    .send({
      comment: 'I commented on your post',
      author: 'test_user',
      postId: '1',
    })

    expect(res.body).toEqual({
      id: expect.any(String),
      comment: 'I commented on your post',
      author: 'test_user',
      postId: '1',
    })
  })

  it('should return the top ten posts with the most comments', async () => {
    const res = await request(app)
      .get('/api/v1/posts/popular')
        expect(res.body).toHaveLength(10)
  })

  it('should return the user with the mosts posts', async () => {
    const res = await request(app)
      .get('/api/v1/users/prolific')
      expect(res.body).toHaveLength(10)
  })


  it('should delete a comment by the id', async () => { 
    const res = await request(app)
      .delete('/api/v1/comments/1')

      expect(res.body).toEqual(
      {
          comment: expect.any(String),
      }
        )
  })

});
