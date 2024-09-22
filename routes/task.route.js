"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.verifyUser, task_controller_1.getTasks);
router.post("/create", auth_middleware_1.verifyUser, task_controller_1.createTask);
router.get("/:id", auth_middleware_1.verifyUser, task_controller_1.getTaskById);
router.patch("/update/:id", auth_middleware_1.verifyUser, task_controller_1.updateTask);
router.delete("/delete/:id", auth_middleware_1.verifyUser, task_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.route.js.map