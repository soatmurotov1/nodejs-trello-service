import express from "express"


import { createBoards, findAllBoards, findOneBoards, updateBoards, deleteBoards } from "../controllers/board.controller.js"



const routerBoards = express.Router()



routerBoards.post("/boards", createBoards)
routerBoards.get("/boards", findAllBoards)
routerBoards.get("/boards/:id", findOneBoards)
routerBoards.put("/boards/:id", updateBoards)
routerBoards.delete("/boards/:id", deleteBoards)





export default routerBoards
