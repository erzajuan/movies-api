const { Pool } = require("pg");
require("dotenv").config({ quiet: true });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Optional: test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to the database", err.stack);
  } else {
    console.log("✅ Database connected via pg");
    release();
  }
});

module.exports = pool;