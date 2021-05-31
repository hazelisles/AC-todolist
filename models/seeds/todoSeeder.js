const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'Van',
  email: 'van@scalet.example.net',
  password: 'scalet'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from({ length: 5 }, (value, i) => Todo.create({ name: `travel number ${i+1} city`, userId })))
    })
    .then(() => {
      console.log('Done!')
      process.exit()
    })
})