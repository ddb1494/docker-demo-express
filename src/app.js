const express = require('express');
const app = express();
const db = require('./db');

app.get('/', (req, res) => {
  res.send(`Hello World! - ${Date.now()}`);
});

app.get('/db', async (req, res) => {
  let conn;
  let rs;
  try {
    conn = await db.getConnection();
    rs = await conn.query('SELECT table_name FROM information_schema.tables');
    rs = rs.map((e) => e.table_name);
  } finally {
    if (conn) conn.release();
  }
  res.json(Array.isArray(rs) ? rs.slice(0, 10) : null);
  console.debug(Date.now());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
