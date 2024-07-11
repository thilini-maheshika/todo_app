const express = require('express');
const router = express.Router();
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodosbyId,
    searchtodo,
    getCompletedTodos,
    getTodaysTodos
} = require('../../controllers/todoController');
const auth = require('../../middlewares/userAuth');

router.post('/', auth, createTodo);
router.get('/all', auth, getTodos);
router.get('/fetch/:id', auth, getTodosbyId);
router.get('/completed', auth, getCompletedTodos);
router.get('/today', auth, getTodaysTodos);
router.get('/search', auth, searchtodo);
router.put('/update/:id', auth, updateTodo);
router.delete('/delete/:id', auth, deleteTodo);

module.exports = router;
