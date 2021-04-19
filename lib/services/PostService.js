const Posts = require('../models/Posts');


module.exports = class PostService {
  static async create( user, photo_url, caption, tags ) {
    const post = await Posts.create( user, photo_url, caption, tags )
    return post;
  }

  static async getAll() {
    const posts = await Posts.getAll();
    return posts;
  }

  static async getById(id) {
    const post = await Posts.getById(id);
    return post;
  }

  static async updateById(id, caption, username ) {
    const post = await Posts.updateById(id, caption, username)
    return post;
  }

  static async destroy(id, username) {
    const post = await Posts.destroy(id, username);
    return post;
  }

  static async getPopular(){
    const post = await Posts.getByPopularPosts();
    return post;
  }
};