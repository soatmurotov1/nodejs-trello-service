import express from "express"

import { createUsers, findAllUsers, findOneUsers, updateUsers, deleteUsers } from "../controller/users.controller.js"



const routerUsers = express.Router()


routerUsers.post("/", createUsers)
routerUsers.get("/", findAllUsers)
routerUsers.get("/:id", findOneUsers)
routerUsers.put("/:id", updateUsers)
routerUsers.delete("/:id", deleteUsers)



export default routerUsers