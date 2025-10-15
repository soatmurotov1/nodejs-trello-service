import { Router } from "express"
import userRouter from "./users.routes.js"
import boardRouter from "./boards.routes.js"
import taskRouter from "./tasks.routes.js"
import columnsRouter from "./columns.routes.js"
import loginRiuter from "./"
const router = Router()

router.use("/users", userRouter)
router.use("/boards", boardRouter)
router.use("/tasks", taskRouter)
router.use("/columns", columnsRouter)
router.use("/login", )
export default router
