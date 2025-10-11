import express from "express"


import { createBoards, findAllBoards, findOneBoards, updateBoards, deleteBoards } from "../controller/boards.controller.js"



const routerBoards = express.Router()



routerBoards.post("/", createBoards)
routerBoards.get("/", findAllBoards)
routerBoards.get("//:id", findOneBoards)
routerBoards.put("/:id", updateBoards)
routerBoards.delete("/:id", deleteBoards)





export default routerBoards
