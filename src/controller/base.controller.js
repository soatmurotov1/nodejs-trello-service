import pool from "../config/database.js"

export const createBaseController = (table) => ({

  

  async createOne(req, res) {
    try {
      const key = Object.keys(req.body)
      if (key.length === 0) {
        return res.status(400).json({ message: "Request body is empty" })
      }
      const value = Object.values(req.body)
      const query = `INSERT INTO ${table} (${key.join(",")}) VALUES (${key.map((_, i) => `$${i + 1}`).join(",")}) RETURNING *`
      const createAll = await pool.query(query, [value])
      res.status(201).json({ data: createAll.rows[0] })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Error in thre serveer`
      })      
    }
  },
  
  
  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const offset = (page - 1) * limit
      const findAll = await pool.query(`SELECT * FROM ${table} OFFSET $1 LIMIT $2`, [offset, limit])
      
      res.status(200).json({data: findAll.rows })
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error in the server"
      })
    }
  },

  
  async getOne(req, res) {
      try {
          const getOne = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])

          if (getOne.rows.length === 0) {
            return res.status(404).json({ message: "Not found" })
          }

          res.json({ data: getOne.rows[0] })

        } catch (err) { 
            console.log(err);
            res.status(500).json({
              message: `error in the server`
            })
            
        }
    },
    

    
    async updateOne(req, res) {
        try {
            const key = Object.keys(req.body)

            const value = Object.values(req.body)
            const query = `UPDATE ${table} SET ${key.map((k, i) => `${k}=$${i + 1}`).join(",")} WHERE id=$${key.length + 1} RETURNING *`

            const updateOne = await pool.query(query, [...value, req.params.id])

            if (updateOne.rows.length === 0) {
              return res.status(404).json({ message: "Not found" })
            }

            res.json({ data: updateOne.rows[0] })

        } catch (err) {
            console.log(err);
            res.status(500).json({
              message: `Error in the server`
            })
            
        }
    },
    
  

    async deleteOne(req, res) {
    try {
        const deleteOne = await pool.query(`DELETE FROM ${table} WHERE id=$1 RETURNING *`, [req.params.id])
        if (deleteOne.rows.length === 0) {
          return res.status(404).json({ message: "Not found" })
        }

        res.json({ data: `deleted`})

    } catch (err) { 
        console.log(err);
        res.status(500).json({
          message: `Error in the server`
        })
        
    }
}
})
