const pool = require('../utils/pool');
const Comment = require('./Comment');

module.exports = class Posts {
  id;
  user;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.user = row.username;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async create( user, photoUrl, caption, tags ) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO posts (username, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [user, photoUrl, caption, tags]
    );
    return new Posts(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT * FROM posts`);
    return rows.map(row => new Posts(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
      SELECT
      comment_by, 
      comment,
      caption,
      username,
      github_username,
      photo_url
      FROM users
      INNER JOIN posts
      ON posts.username = users.github_username
      left JOIN comments
      ON comments.post_id = posts.id
      WHERE posts.id=$1`, [id]
    )
    return {
      ...new Posts(rows[0]),
     comments: rows.map(row => new Comment(row))
      // ...new Comment(rows[0])
    }
  }

  static async updateById(id, caption, username) {
    const { rows } = await pool.query(`
    UPDATE posts
    SET caption=$2
    WHERE id=$1
    AND username=$3
    RETURNING caption`, [id, caption, username]);

    return new Posts(rows[0])
  }

  static async destroy(id, username) {
    const { rows } = await pool.query(`DELETE FROM posts 
    WHERE id=$1
    AND username=$2
    RETURNING *`, [id, username])

    return new Posts(rows[0])
  }
  
}

