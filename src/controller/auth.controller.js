import pool from "../config/database.js"
import bcrypt from "bcrypt"
import { hashPassword } from "../middleware/hashPassword.js"



export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const mavjud = await pool.query("SELECT id FROM users WHERE email = $1", [email])
    if (mavjud.rows.length) {
      return res.status(409).json({ message: "Email is already registered." })
    }

    
    const hashed = await hashPassword(password)

    const saqlash = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    )

    const user = saqlash.rows[0]
    res.status(201).json({
      message: "User registered.",
      user
    })
  } catch (err) {
    next(err)
  }
}


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const userRes = await pool.query(
      "SELECT id, email, password, name FROM users WHERE email = $1",
      [email]
    )

    if (userRes.rows.length === 0) {
      return res.status(401).json({ message: "email or password incorrect" })
    }

    const user = userRes.rows[0]

    const hisob = await bcrypt.compare(password, user.password)
    if (!hisob) {
      return res.status(401).json({ message: "email or password incorrect" })
    }

    res.status(200).json({
      message: "you have login in",
      user: { id: user.id, name: user.name, email: user.email }
    })
  } catch (err) {
    next(err)
  }
}
