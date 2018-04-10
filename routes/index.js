const express = require('express')
const router = express.Router()

/* GET home page. */
const homePage = (req, res, next) => {
  res.render('index', { title: 'Home Page' })
}

router.get('/', homePage)

module.exports = router
