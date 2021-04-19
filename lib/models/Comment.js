const pool = require('../utils/pool');

module.exports = class Comment{
  id;
  author;
  postId;
  comment;

  constructor(row){
    this.id = row.id;
    this.author = row.comment_by;
    this.postId = row.post_id;
    this.comment = row.comment;
  }

  static async create(author, postId, comment){
    const {rows} = await pool.query(`
    INSERT into comments (comment_by, post_id, comment)
    VALUES ($1, $2, $3)
    RETURNING *`, 
    [author, postId, comment])

    return new Comment(rows[0]);
  }

  static async delete(id, username){ 
    const {rows} = await pool.query(`
      DELETE FROM comments
      WHERE id=$1
      AND comment_by = $2
      RETURNING comment
    `, [id, username]);

    return new Comment(rows[0]);
  }
}