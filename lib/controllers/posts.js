const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const pool = require('../utils/pool');

module.exports = Router().get('/', authenticate, async (req, res) => {
  const { rows } = await pool.query(
    `
    SELECT 
      * 
    FROM 
      posts
    `
  );

  res.send(rows);
});
