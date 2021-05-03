const Todo = require('../todo')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < 5; i++) {
    Todo.create({ name: `name-${i}`})
  }
  console.log('done!')
})