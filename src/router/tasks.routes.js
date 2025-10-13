import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne } from "../controller/tasks.controller.js"
import { taskValidation } from "../validation/tasks.validation.js"


const routerTasks = Router()


routerTasks.get("/", getAll)          
routerTasks.get("/:id", getOne)
routerTasks.post("/", createOne)
routerTasks.put("/:id", updateOne)
routerTasks.delete("/:id", deleteOne)


export default routerTasks


