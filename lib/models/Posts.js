const pool = require('../utils/pool');

module.exports = class Posts {
  id;
  user;
  photoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.user = row.userkk;
    this.photoUrl = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async create( user, photoUrl, caption, tags ) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO posts (userkk, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *`, 
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
    SELECT * 
    FROM posts 
    WHERE id=$1`, 
    [id])
    return new Posts(rows[0])
  }

  static async updateById(id, caption) {
    const { rows } = await pool.query(`
    UPDATE posts
    SET caption=$1
    WHERE id=$2
    RETURNING *`, [caption, id]);

    return new Posts(rows[0])
  }

  static async destroy(id) {
    const { rows } = await pool.query(`DELETE FROM posts WHERE id=$1`, [id])

    return new Posts(rows[0])
  }
  
}

