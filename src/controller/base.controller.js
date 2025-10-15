import pool from "../config/database.js"


export const BaseController = (table) => ({
  getAll: async (req, res) => {
    try {
      const getAll = await pool.query(`SELECT * FROM ${table}`)
      res.status(200).json({ message: `Data found`, data: getAll.rows})
      if(getAll.rows.length === 0) {
        return res.status(400).json({ message: `Data not found from ${table}`})
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `error in the server` })
    }
  },



  getOne: async (req, res) => {
    try {
      const { id } = req.params
      const getOne = await pool.query(`SELECT * FROM ${table} WHERE id=$1`, [id])

      if (getOne.rows.length === 0){
        return res.status(400).json({ message: `not found id ${id}` })
      } 

      res.status(200).json({ message: `Data found`, data: getOne.rows[0]})
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: `error in the server` })
    }
  },
  createOne: async (req, res) => {
    try {
    if (table === "tasks") {
      const { columnId } = req.body
      if (!columnId) {
        return res.status(400).json({ message: "columnId shart" })
      }
      const column = await pool.query('SELECT * FROM columns WHERE id=$1', [columnId])
      if (column.rows.length === 0) {
        return res.status(400).json({ message: `columns and id=${columnId} not found` })
      }
    }

    if (table === "users" && req.body.email) {
      const emailUser = await pool.query(`SELECT * FROM users WHERE email=$1`, [req.body.email])
      if (emailUser.rows.length > 0) {
        return res.status(400).json({ message: "Email allaqachon bor" });
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
      res.status(500).json({ message: `error in the server` })
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
    res.status(500).json({ message: `error in the server` })
  }
},



search: async (req, res) => {
  try {
    const keys = Object.keys(req.body)
    const values = Object.values(req.body)

    if(keys.length === 0){
      return res.status(400).json({ message: `No search parameters sent`})
    }

    const condition = keys.map((key, i) => `${key}=$${i+1}`).join(" and ")
    const query = `SELECT * FROM ${table} WHERE ${condition}`
    const searchRes = await pool.query(query, values)

    res.status(200).json({ data: searchRes.rows })
  } catch(error) {
    console.error(error)
    res.status(500).json({ message: `error in the server` })
  }
}

})
