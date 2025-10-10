import pool from "../config/database.js"









export const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body


    if ( !name || !email || !password) {
      return res.status(400).json({
        message: `name, email, password required`

      })
    }

    const query = `insert into users (name, email, password) VALUES ($1, $2, $3) returning *`
    const values = [name, email, password]
    const queryAll = await pool.query(query, values)

    res.status(201).json({
      message: "users created",
      users: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: "error in server" 
    })
  }
}





export const findAllUsers = async (req, res) => {
  try {
    const query = `select * from users`
    const queryAll = await pool.query(query)

    res.status(200).json({
      message: "all users",
      users: queryAll.rows
    })

  } catch (err) {
    console.error(err); 
    res.status(500).json({ 
        message: `Error in the server` 
    })
  }
}








export const findOneUsers = async (req, res) => {
  try {
    const { id } = req.params
    const query = `select * from users where id = $1`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ 
        message: `users not found` 
    })
    }

    res.status(200).json({
      message: "users found",
      users: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `error in th server`
    })
  }
}







export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body

    const query = `update users set name = $1, email = $2 , password = $3 where id = $4 returning *`
    const queryAll = await pool.query(query, [name, email, password, id])


    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "users not found" })
    }

    res.status(200).json({
      message: "users updated",
      users: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error in the server" })
  }
}



export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params

    const query = `delete from users where id = $1 returning *`
    const queryAll = await pool.query(query, [id])

    if (queryAll.rows.length === 0) {
      return res.status(404).json({ message: "users not found" })
    }

    res.status(200).json({
      message: "users deleted",
      deleted: queryAll.rows[0]
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        message: `Server error` 
    })
  }
}


