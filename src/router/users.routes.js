import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/users.controller.js"
import { userValidation } from "../validation/users.validation.js"


const routerUsers = Router()


routerUsers.get("/", getAll)          
routerUsers.get("/:id", getOne)
routerUsers.post("/", createOne)
routerUsers.put("/:id", updateOne)
routerUsers.delete("/:id", deleteOne)


export default routerUsers


