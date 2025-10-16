import pool from "../config/database.js"
import { loginPassword} from "../helper/hashPassword.js"



export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
    if (user.rows.length === 0){
      return res.status(404).json({ message: `not found email ${email}`})
    }
    const checkPassword = loginPassword(password, user.rows[0].password)
    if(!checkPassword){
      return res.status(400).json({message:`INVALID PASSWORD!`})
    }

    const valid = await hashPassword(password, user.rows[0].password)
    if (!valid) return res.status(401).json({ message: "Yaroqsiz password" })

    const { password: _, ...data } = user.rows[0]
    res.status(201).json({ data: valid})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}