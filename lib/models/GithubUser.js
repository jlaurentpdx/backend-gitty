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
      .then((resp) => {
        const { rows } = resp;
        return new GithubUser(rows[0]);
      });
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
      .then((resp) => {
        const { rows } = resp;
        if (!rows[0]) {
          return null;
        } else {
          return rows[0];
        }
      })
      .then((user) => new GithubUser(user));
  }
};
