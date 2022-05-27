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

  static getAll() {
    return pool
      .query(
        `
      SELECT 
        * 
      FROM 
        posts
      `
      )
      .then((resp) => {
        const { rows } = resp;
        return rows;
      })
      .then((rows) => rows.map((row) => new Post(row)));
  }

  static insert(username, text) {
    return pool
      .query(
        `
    INSERT INTO
      posts (username, text)
    VALUES
      ($1, $2)
    RETURNING 
      *
    `,
        [username, text]
      )
      .then((resp) => {
        const { rows } = resp;
        return new Post(rows[0]);
      });
  }
};
