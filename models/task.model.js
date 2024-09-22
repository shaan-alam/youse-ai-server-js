"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },
    dueDate: { type: Date, required: false },
}, { timestamps: true });
const Task = (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=task.model.js.map