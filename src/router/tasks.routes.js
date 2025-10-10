import express from "express";
import { createTasks, findAllTasks, findOneTasks, updateTasks, deleteTasks } from "../controller/tasks.controller.js";



const routerTasks = express.Router();



routerColumns.post("/tasks", createTasks)
routerColumns.get("/tasks", findAllTasks)
routerColumns.get("/tasks/:id", findOneTasks)
routerColumns.put("/tasks/:id", updateTasks)
routerColumns.delete("/tasks/:id", deleteTasks)





export default routerColumns;
