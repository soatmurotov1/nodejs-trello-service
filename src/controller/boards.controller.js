import pool from "../config/database.js"









export const createBoards = async (req, res) => {
  try {
    const { title, columns } = req.body


    if ( !title || !columns) {
      return res.status(400).json({
        message: `title, columns required`

      })
    }

    const query = `insert into boards ( title, columns) VALUES ($1, $2) returning *`
    const values = [id, title, columns]
    const queryAll = await pool.query(query, values)

    res.status(201).json({
      message: "boards created",
      board: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: "error in server" 
    })
  }
}





export const findAllBoards = async (req, res) => {
  try {
    const query = `select * from boards`
    const queryAll = await pool.query(query)

    res.status(200).json({
      message: "all boards",
      boards: queryAll.rows
    })

  } catch (err) {
    console.error(err); 
    res.status(500).json({ 
        message: `Error in the server` 
    })
  }
}








export const findOneBoards = async (req, res) => {
  try {
    const { id } = req.params
    const query = `select * from boards where id = $1`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ 
        message: `boards not found` 
    })
    }

    res.status(200).json({
      message: "boards found",
      board: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `error in th server`
    })
  }
}







export const updateBoards = async (req, res) => {
  try {
    const { id } = req.params
    const { title, columns } = req.body

    const query = `update boards set title = $1, columns = $2 where id = $3 returning *`
    const queryAll = await pool.query(query, [title, columns, id])


    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "boards not found" })
    }

    res.status(200).json({
      message: "boards updated",
      board: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in the server" })
  }
}


export const deleteBoards = async (req, res) => {
  try {
    const { id } = req.params

    const query = `delete from boards where id = $1 returning *`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "boards not found" })
    }

    res.status(200).json({
      message: "boards deleted",
      deleted: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `Server error` 
    })
  }
}


