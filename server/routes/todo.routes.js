const { readTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller.js")
const logger = require("../middlewares/logger.js")
const protect = require("../middlewares/protect.js")

const router = require("express").Router()

router
    .get("/", logger, readTodo)
    .post("/create", logger, createTodo)
    .patch("/modify/:todoID", updateTodo)
    .delete("/remove/:todoID", deleteTodo)

module.exports = router    