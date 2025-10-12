import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/boards.controller.js"

const routerBoards = Router()

routerBoards.get("/", getAll)          
routerBoards.get("/:id", getOne)
routerBoards.post("/", createOne)
routerBoards.put("/:id", updateOne)
routerBoards.delete("/:id", deleteOne)



export default routerBoards


