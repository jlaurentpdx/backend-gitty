const pool = require('../utils/pool');

module.exports = class GithubUser {
  username;
  photoUrl;

  constructor(row) {
    this.username = row.username;
    this.photoUrl = row.photo_url;
  }

  static insert({ username, photoUrl }) {
    return pool
      .query(
        `
      INSERT INTO 
        github_users (username, photo_url)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
        [username, photoUrl]
      )
      .then(({ rows }) => new GithubUser(rows[0]));
  }

  static findByUsername(username) {
    return pool
      .query(
        `
      SELECT
        *
      FROM
        github_users
      WHERE
        username=$1
      `,
        [username]
      )
      .then(({ rows }) => {
        if (!rows[0]) {
          return null;
        } else {
          return new GithubUser(rows[0]);
        }
      });
  }
};
