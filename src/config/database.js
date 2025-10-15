import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "node_trello_service",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root"
})



export default pool