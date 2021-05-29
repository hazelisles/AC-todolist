const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const PORT = process.env.PORT || 3000

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'asecretmakesawomanwoman',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`APP is now running on http://localhost:${PORT}`)
})