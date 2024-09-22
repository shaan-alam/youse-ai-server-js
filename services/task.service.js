"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new task_model_1.default(taskData);
    return yield task.save();
});
exports.createTask = createTask;
const getTasks = (filters, sortBy) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (filters.status)
        query.status = filters.status;
    if (filters.priority)
        query.priority = filters.priority;
    const tasks = yield task_model_1.default.find(query).sort({ [sortBy]: 1 });
    return yield tasks;
});
exports.getTasks = getTasks;
const getTaskById = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.findById(taskId);
});
exports.getTaskById = getTaskById;
const updateTask = (taskId, taskData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.findByIdAndUpdate(taskId, taskData, { new: true });
});
exports.updateTask = updateTask;
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.findByIdAndDelete(taskId);
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.service.js.map