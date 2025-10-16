import bcrypt from "bcrypt"

export const hashpassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const loginPassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed)
}
