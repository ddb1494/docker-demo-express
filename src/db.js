const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'db', // Docker 컨테이너 이름
  user: 'root',
  password: 'root',
  database: 'my_db',
  connectionLimit: 5,
});

module.exports = pool;
