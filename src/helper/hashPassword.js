import bcrypt from "bcrypt"

export const password = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const hashPassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed)
}
