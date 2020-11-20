// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: "postgres",
//   password: "123",
//   database: "task_database",
//   host: "localhost",
//   port: 5432,
// });


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false

  }
});
module.exports = pool;