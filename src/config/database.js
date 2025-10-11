import { Pool } from "pg";


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "root",
    database: "node_trello_service",
    port: 5432
})


export default pool
