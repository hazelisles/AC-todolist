const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const { check, validationResult } = require('express-validator')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', [check('password').notEmpty().withMessage('請輸入密碼！'), check('email').notEmpty().withMessage('請輸入Email！')], (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      const loginemail = req.body.email
      const errors = error.array()
      return res.render('login', {
      errors,
      loginemail,
    })
    }
    if (error.isEmpty()) {
      next()
    }
    }, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ msg: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ msg: '此 Email 已經註冊過了。'})
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      }).then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router