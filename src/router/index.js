

import express from "express"
import routerBoards from "./boards.routes.js"
import routerColumns from "./columns.routes.js"
import routerTasks from "./tasks.routes.js"
import routerUsers from "./users.routes.js"


const router = express.Router();



router.use("/users", routerUsers);
router.use("/boards", routerBoards);
router.use("/columns", routerColumns);
router.use("/tasks", routerTasks);



export default router;
