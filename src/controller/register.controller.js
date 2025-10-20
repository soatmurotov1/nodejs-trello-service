import pool from "../config/database.js"
import { hashPassword } from "../helper/hashPassword.js"


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: `Bu ${email} email allaqachon mavjud` })
    }
    const hashed = await hashPassword(password)
    const newUser = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,[name, email, hashed])
    
    const { password: _, ...data } = newUser.rows[0]
    res.status(201).json({ 
      message: `foydalanuvchi ro'yxatdan o'tdi`,
      user: data 
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}