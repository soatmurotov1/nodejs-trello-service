import express from "express";
import { createTasks, findAllTasks, findOneTasks, updateTasks, deleteTasks } from "../controller/tasks.controller.js";



const routerTasks = express.Router();



routerTasks.post("/tasks", createTasks)
routerTasks.get("/tasks", findAllTasks)
routerTasks.get("/tasks/:id", findOneTasks)
routerTasks.put("/tasks/:id", updateTasks)
routerTasks.delete("/tasks/:id", deleteTasks)





export default routerTasks;
