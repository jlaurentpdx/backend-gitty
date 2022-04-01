const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  photoUrl;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.photoUrl = row.photo_url;
  }

  static async insert({ username, photoUrl }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        github_users (username, photo_url)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [username, photoUrl]
    );

    return new GithubUser(rows[0]);
  }
};
