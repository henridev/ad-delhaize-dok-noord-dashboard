const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "delhaizeDokNoord",
  password: "password",
  port: 5432,
});
