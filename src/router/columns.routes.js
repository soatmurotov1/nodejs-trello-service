import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/columns.controller.js"

const routerColumns = Router()

routerColumns.get("/", getAll)          
routerColumns.get("/:id", getOne)
routerColumns.post("/", createOne)
routerColumns.put("/:id", updateOne)
routerColumns.delete("/:id", deleteOne)

export default routerColumns


