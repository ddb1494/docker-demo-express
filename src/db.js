const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'mdb',
  user: 'root',
  password: 'root',
  database: 'my_db',
});

module.exports = pool;
