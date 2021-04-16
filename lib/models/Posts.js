const pool = require('../utils/pool');

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
    FROM posts
    INNER JOIN comments
    ON posts.id = comments.post_id 
    INNER JOIN users
    ON comments.comment_by = users.github_username 
    WHERE posts.id=1` 
    )
    return new Posts(rows[0])
  }

  static async updateById(id, caption) {
    const { rows } = await pool.query(`
    UPDATE posts
    SET caption=$2
    WHERE id=$1
    RETURNING caption`, [id, caption]);

    return new Posts(rows[0])
  }

  static async destroy(id) {
    const { rows } = await pool.query(`DELETE FROM posts WHERE id=$1 RETURNING *`, [id])

    return new Posts(rows[0])
  }
  
}

