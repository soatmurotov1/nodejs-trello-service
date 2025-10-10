import express from "express"

import { createColumns, findAllColumns, findOneColumns, updateColumns, deleteColumns } from "../controller/columns.controller.js"



const routerColumns = express.Router()






routerColumns.post("/columns", createColumns)
routerColumns.get("/columns", findAllColumns)
routerColumns.get("/columns", findOneColumns)
routerColumns.put("/columns", updateColumns)
routerColumns.delete("/columns", deleteColumns)

