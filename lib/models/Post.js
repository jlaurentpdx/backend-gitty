const pool = require('../utils/pool');

module.exports = class Post {
  id;
  username;
  text;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.text = row.text;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT 
        * 
      FROM 
        posts
      `
    );

    return rows.map((row) => new Post(row));
  }
};
