import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/users.controller.js"


const routerUsers = Router()
console.log(1);


routerUsers.get("/", getAll)          
routerUsers.get("/:id", getOne)
routerUsers.post("/", createOne)
routerUsers.put("/:id", updateOne)
routerUsers.delete("/:id", deleteOne)


export default routerUsers


