import express from "express"

import { createUsers, findAllUsers, findOneUsers, updateUsers, deleteUsers } from "../controller/users.controller.js"



const routerUsers = express.Router()


routerUsers.post("/users", createUsers)
routerUsers.get("/users", findAllUsers)
routerUsers.get("/users/:id", findOneUsers)
routerUsers.put("/users/:id", updateUsers)
routerUsers.delete("/users/:id", deleteUsers)



export default routerUsers