import pool from "../config/database.js"

export const createBaseController = (table) => ({


    async createOne(req, res, next) {
      try {
        const key = Object.keys(req.body)
        const value = Object.values(req.body)
        const query = `INSERT INTO ${table} (${key.join(",")}) VALUES (${key.map((_, i) => `$${i + 1}`).join(",")}) RETURNING *`
        const createAll = await pool.query(query, value)
        res.status(201).json({ data: createAll.rows[0] })
      } catch (err) {
        return next(err) 
       }
    },


  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query
      const offset = (page - 1) * limit
      const findAll = await pool.query(`SELECT * FROM ${table} OFFSET $1 LIMIT $2`, [offset, limit])
      res.json({ data: findAll.rows })
    } catch (err) {
        return next(err) 
    }
  },

  
  async getOne(req, res, next) {
      try {
          const getOne = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])

          if (getOne.rows.length === 0) {
            return res.status(404).json({ message: "Not found" })
          }

          res.json({ data: getOne.rows[0] })

        } catch (err) { 
            return next(err) 
        }
    },
    

    
    async updateOne(req, res, next) {
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
            return next(err)
        }
    },
    
  

    async deleteOne(req, res, next) {
    try {
        const deleteOne = await pool.query(`DELETE FROM ${table} WHERE id=$1 RETURNING *`, [req.params.id])
        if (deleteOne.rows.length === 0) {
          return res.status(404).json({ message: "Not found" })
        }

        res.json({ data: deleteOne.rows[0] })

    } catch (err) { 
        return next(err)
    }
}
})
