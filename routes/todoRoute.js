const { Router } = require("express");

const { getAllTodos, saveTodo, deleteTodo, updateTodo, getTodo } = require("../controllers/todoController");

const router = Router();

// router.get("/todos", getAllTodos);

// router.get("/todos/:id", getTodo);

// router.post("/todos", saveTodo);

// router.put("/todos/:id", updateTodo);

// router.delete("/todos/:id", deleteTodo);

router.get("/", getAllTodos);

router.get("/:id", getTodo);

router.post("/", saveTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;