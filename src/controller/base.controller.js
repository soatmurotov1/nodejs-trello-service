import pool from "../config/database.js"
import bcrypt, { hash } from "bcrypt"


export const BaseController = (table) => ({
  getAll: async (req, res, next) => {
    try {
      const tables = ["users", "columns", "tasks", "boards" ]

      if (!tables.includes(table)) {
        return res.status(401).json({ message: `table not found ${table}`})
      }
      const getAllData = await pool.query(`SELECT * FROM ${table}`)
      const data = getAllData.rows.map(({password, ...rest}) => rest)
      // console.log(getAllData);
      
    
      res.status(200).json({ message: `data found from ${table}`, data: data})
      
    } catch (error) {
      console.error(error)
      next(error)
    }
  },


  getOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const tables = ["users", "boards", "tasks", "columns"]
      if(!tables.includes(table)) {
        return res.status.json({ message: `table not found from ${table}` })
      }

      const getOneData = await pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id])
      const data = getOneData.rows.map(({password, ...rest}) => rest)
      if (getOneData.rows.length === 0){
        return res.status(404).json({ message: `not found id ${id} from ${table}` })
      } 

      res.status(200).json({ message: `data found id ${id} from ${table}`, data: data})
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
  createOne: async (req, res, next) => {
    try {
    const tables = ["users", "boards", "tasks", "columns"]
    if(!tables.includes(table)) {
        return res.status(400).json({ message: `table not found from ${table}` })
    }

    if(table === "tasks") {
      const { columnId } = req.body
      if (!columnId) {
        return res.status(401).json({ message: "columnId shart" })
      }
      const column = await pool.query('SELECT * FROM columns WHERE id=$1', [columnId])
      if (column.rows.length === 0) {
        return res.status(400).json({ message: `columns and id=${columnId} not found` })
      }
    }

    if (table === "users") {
      const { email, password } = req.body
      if(!email){
        return res.status(400).json({ message: `email is required`})
      } 
      if(!password) {
        return res.status(400).json({ message: `password is required`})

      }
      const emailUser = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
      if (emailUser.rows.length > 0) {
        return res.status(400).json({ message: `bu ${email} mail allaqachon bor` });
      }
    }


    const key = Object.keys(req.body)
    const values = Object.values(req.body)
    const query = `INSERT INTO ${table} (${key.join(",")}) VALUES (${key.map((_, i) => `$${i+1}`).join(",")}) RETURNING *`
    const createOne = await pool.query(query, values)

    res.status(201).json(createOne.rows[0]);} catch (error) {
    console.error(error)
    res.status(500).json({ message: `error in the server` });
  }
},



  updateOne: async (req, res) => {
    try {
    const tables = ["users", "boards", "tasks", "columns"]
    if(!tables.includes(table)) {
        return res.status(400).json({ message: `table not found from ${table}` })
    }

      const { id } = req.params
      const keys = Object.keys(req.body)
      const values = Object.values(req.body)
      const tostring = keys.map((key, i) => `${key}=$${ i+1 }`).join(", ")
      const query = `UPDATE ${table} SET ${tostring} WHERE id=$${ keys.length+1 } RETURNING *`
      const updateOne = await pool.query(query, [...values, id])

      if (updateOne.rows.length === 0) {
        return res.status(404).json({ message: `${id} id not found from ${table}`})
       }
      res.status(201).json({
        message: `updated id ${id}`,
        data: updateOne.rows[0]
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },


deleteOne: async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`DELETE FROM ${table} WHERE id=$1 RETURNING *`, [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `nothing found from id ${id}` })
    }

    res.status(200).json({
      message: `Deleted id ${id}`
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
},



})
