import pool from "../config/database.js"
import { loginPassword } from "../helper/hashPassword.js"


export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

    if (user.rows.length === 0) {
      return res.status(404).json({ message: `bu ${email} email topilmadi` })
    }
    const isValid = await loginPassword(password, user.rows[0].password)

    if (!isValid) {
      return res.status(400).json({ message: `Pasword notugri` })
    }

    const { password: _, ...data } = user.rows[0]
    res.status(200).json({
      message: "Tizimga kirdingiz",
      user: data
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
