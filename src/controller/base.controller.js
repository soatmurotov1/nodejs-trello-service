import { ta } from "zod/locales"
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
      return next(error)
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params
       const checkId = await pool.query(`SELECT * from ${table} where id = $1`, [id])
       if(checkId.rows.length === 0){
            return res.status(404).json({message:`NOT FOUND SUCH AN ID ${id}`})
       }
      const tables = ["users", "boards", "tasks", "columns"]
      if(!tables.includes(table)) {
        return res.status.json({ message: `table not found from ${table} `})
      }
      const getOneData = await pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id])
      const data = getOneData.rows.map(({password, ...rest}) => rest)
      if (getOneData.rows.length === 0){
        return res.status(404).json({ message: `not found id ${id} from ${table}` })
      } 
      res.status(200).json({ message: `data found id ${id} from ${table}`, data: data})
    } catch (error) {
      console.error(error)
      return next(error)
    }
  },
    createOne: async (req, res, next) => {
    try {
    const tables = ["users", "boards", "tasks", "columns"]
    if(!tables.includes(table)) {
        return res.status(400).json({ message: `table not found from ${table}` })
    }
    if(table === "tasks") {
      const { columnId, boardId, taskId } = req.body
      const boardIdCheck = await pool.query(`SELECT * from boards where id = $1`, [boardId])
      if (boardIdCheck.rows.length === 0) {
        return res.status(401).json({ message: `not found id from boards` })
      }
       const columnIdCheck = await pool.query(`SELECT * from columns where id = $1`, [columnId])
      if (columnIdCheck.rows.length === 0) {
        return res.status(401).json({ message: `not found id from columns` })
      }
       const taskIdCheck = await pool.query(`SELECT * from tasks where id = $1`, [taskId])
      if (taskIdCheck.rows.length === 0) {
        return res.status(401).json({ message: `not found id from tasks` })
      }

    }

    if (table === "users") {
      const { email, password} = req.body
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
    if(table === "columns"){
    const {boardId} = req.body
      const boardIdCheck = await pool.query(`SELECT * from boards where id = $1`, [boardId])
      if (boardIdCheck.rows.length === 0) {
        return res.status(401).json({ message: "boardId ID raqami topilmadi" })
      }}
    const body = req.body
    if(body.password){
              const hashedPassword = await bcrypt.hash(body.password, 10)
              body.password = hashedPassword   
    }
    const key = Object.keys(req.body)
    const values = Object.values(req.body)
    const query = `INSERT INTO ${table} (${key.join(", ")}) VALUES (${key.map((_, i) => `$${i+1}`).join(", ")}) RETURNING *`
    const createOne = await pool.query(query, values)
    const data = createOne.rows.map(({password, ...rest}) => rest)
     res.status(201).json({ message: `data created on the ${table}`, data: data})

  }catch (error) {
    console.error(error)
    return next(error)
  }
},

  updateOne: async (req, res, next) => {
    try {
    const tables = ["users", "boards", "tasks", "columns"]
    if(!tables.includes(table)) {
        return res.status(400).json({ message: `table not found from ${table}` })
    }

      const { id } = req.params
      const checkId = await pool.query(`SELECT * from ${table} where id = $1`, [id])
       if(checkId.rows.length === 0){
            return res.status(404).json(`message: NOT FOUND SUCH AN ID ${id}`)
       }
      const keys = Object.keys(req.body)
      const values = Object.values(req.body)
      const tostring = keys.map((key, i) => `${key}=$${ i+1 }`).join(", ")
      const query = `UPDATE ${table} SET ${tostring} WHERE id=$${ keys.length+1 } RETURNING *`
      const updateOne = await pool.query(query, [...values, id])
      
      if (updateOne.rows.length === 0) {
        return res.status(404).json({ message: `${id} id not found from ${table}`})
       }
       const data = updateOne.rows.map(({password, ...rest}) => rest)
     res.status(200).json({ message: `data updated on the ${table}`, data: data})
    } catch (error) {
      console.error(error)
      return next(error)
    }
  },
  

deleteOne: async (req, res) => {
  try {
    const tables = ["users", "boards", "tasks", "columns"]
    if(!tables.includes(table)) {
        return res.status(400).json({ message: `table not found from ${table}` })
    }
   
    const { id } = req.params
    const checkId = await pool.query(`SELECT * from ${table} where id = $1`, [id])
       if(checkId.rows.length === 0){
            return res.status(404).json(`message: NOT FOUND SUCH AN ID ${id}`)
       }
    const result = await pool.query(`DELETE FROM ${table} WHERE id=$1 RETURNING *`, [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ message: `nothing found from id ${id}` })
    }
    return res.status(200).json({
      message: `Deleted id ${id}`
    })
  } catch (error) {
    console.error(error)
    return next(error)
  }
},
search: async (req, res) => {
  try {
    const { page =1, limit = 10 } = req.params

  }catch(error){
    console.error(error)
    return next(error)
    
  }
}
})

