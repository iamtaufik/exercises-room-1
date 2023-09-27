const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'taufikdev',
    database: 'new_blog',
    password: 'root',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;