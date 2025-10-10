import pool from "../config/database.js"









export const createTasks = async (req, res) => {
  try {
    const { title, order, description, userId, boardId, columnId } = req.body


    if (!title || !order || !description || !userId || !boardId || !columnId) {
      return res.status(400).json({
        message: `id, title, order, description, userId, boardId, columnId required`

      })
    }

    const query = `insert into tasks (title, order, description, userId, boardId, columnId) VALUES ($1, $2, $3, $4, $5, $6) returning *`
    const values = [title, order, description, userId, boardId, columnId]
    const queryAll = await pool.query(query, values)

    res.status(201).json({
      message: "tasks created",
      task: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: "error in server" 
    })
  }
}





export const findAllTasks = async (req, res) => {
  try {
    const query = `select * from tasks`
    const queryAll = await pool.query(query)

    res.status(200).json({
      message: "all tasks",
      task: queryAll.rows
    })

  } catch (err) {
    console.error(err); 
    res.status(500).json({ 
        message: `Error in the server` 
    })
  }
}








export const findOneTasks = async (req, res) => {
  try {
    const { id } = req.params
    const query = `select * from tasks where id = $1`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ 
        message: `tasks not found` 
    })
    }

    res.status(200).json({
      message: "tasks found",
      task: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `error in th server`
    })
  }
}







export const updateTasks = async (req, res) => {
  try {
    const { id } = req.params
    const { title, columns } = req.body

    const query = `update tasks set title = $1, order = $2, description= $3,  userId = $4, boardId = $5, columnId = $6 where id = $7 returning *`
    const queryAll = await pool.query(query, [title, order, description, userId, boardId, columnId ])


    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "tasks not found" })
    }

    res.status(200).json({
      message: "tasks updated",
      task: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in the server" })
  }
}


export const deleteTasks = async (req, res) => {
  try {
    const { id } = req.params

    const query = `delete from tasks where id = $1 returning *`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "tasks not found" })
    }

    res.status(200).json({
      message: "tasks deleted",
      deleted: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `Server error` 
    })
  }
}


