const express = require('express')
const router = express.Router()

/* GET users listing. */
const loginPage = (req, res, next) => {
  res.render('index', { title: 'Login Page' })
}

router.get('/', loginPage)

module.exports = router
