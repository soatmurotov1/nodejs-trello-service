import express from "express";
import { createTasks, findAllTasks, findOneTasks, updateTasks, deleteTasks } from "../controller/tasks.controller.js";



const routerTasks = express.Router();


routerTasks.post("/", createTasks)
routerTasks.get("/", findAllTasks)
routerTasks.get("/:id", findOneTasks)
routerTasks.put("/:id", updateTasks)
routerTasks.delete("/:id", deleteTasks)



export default routerTasks;
