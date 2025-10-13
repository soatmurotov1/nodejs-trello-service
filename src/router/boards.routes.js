import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/boards.controller.js"
import { validate } from "../middleware/validate.js"
import { createBoardSchema, updateBoardSchema } from "../validation/boards.validation.js"

const routerBoards = Router()

routerBoards.get("/", getAll)
routerBoards.get("/:id", getOne)
routerBoards.post("/", createOne)
routerBoards.put("/:id", updateOne)
routerBoards.delete("/:id", deleteOne)

export default routerBoards