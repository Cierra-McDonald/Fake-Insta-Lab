const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');



describe('lab-13-fake-instagram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('adds a post to the database', async ()=>{

    const newUser = await User.insert({
      username: 'patrick',
      photoUrl: 'http://avatar.com'
    })

    const res = await request(app)
    .post('/api/v1/posts')
    .send({
      user: newUser.username,
      photo_url: 'http://photo.com',
    })
    expect(res.body).toEqual({
      user: newUser.username,
      photo_url: 'http://photo.com',
    })
  })
});
