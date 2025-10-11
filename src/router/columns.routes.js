import express from "express"

import { createColumns, findAllColumns, findOneColumns, updateColumns, deleteColumns } from "../controller/columns.controller.js"



const routerColumns = express.Router()






routerColumns.post("/", createColumns)
routerColumns.get("/", findAllColumns)
routerColumns.get("/:id", findOneColumns)
routerColumns.put("/:id", updateColumns)
routerColumns.delete("/:id", deleteColumns)

export default routerColumns