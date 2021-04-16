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

  static async updateById(id, caption ) {
    const post = await Posts.updateById(id, caption)
    return post;
  }

  static async destroy(id) {
    const post = await Posts.destroy(id);
    return post;
  }
};