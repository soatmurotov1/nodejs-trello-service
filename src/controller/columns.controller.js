import pool from "../config/database.js"







export const createColumns = async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({
        message: `name required`

      })
    }

    const query = `insert into columns (name) VALUES ($1) returning *`
    const value = [name ]
    const queryAll = await pool.query(query, value)

    res.status(201).json({
      message: "columns created",
      column: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: "error in server" 
    })
  }
}


export const findAllColumns = async (req, res) => {
  try {
    const query = `select * from columns`
    const queryAll = await pool.query(query)

    res.status(200).json({
      message: "all columns",
      column: queryAll.rows
    })

  } catch (err) {
    console.error(err); 
    res.status(500).json({ 
        message: `Error in the server` 
    })
  }
}





export const findOneColumns = async (req, res) => {
  try {
    const { id } = req.params
    const query = `select * from columns where id = $1`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ 
        message: `columns not found` 
    })
    }

    res.status(200).json({
      message: "columns found",
      column: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `error in th server`
    })
  }
}





export const updateColumns = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const query = `update columns set name = $1 where id = $2 returning *`
    const queryAll = await pool.query(query, [name, id])


    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "columns not found" })
    }

    res.status(200).json({
      message: "columns updated",
      column: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in the server" })
  }
}


export const deleteColumns = async (req, res) => {
  try {
    const { id } = req.params

    const query = `delete from columns where id = $1 returning *`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "columns not found" })
    }

    res.status(200).json({
      message: "columns deleted",
      deleted: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `Server error` 
    })
  }
}


