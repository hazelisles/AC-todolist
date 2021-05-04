const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // get all data of todo
  Todo.find()
    .lean()
    .sort({_id: 'asc'})
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const newTodo = req.body.name
  return Todo.create({ name: newTodo })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router