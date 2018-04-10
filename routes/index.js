var express = require('express');
var router = express.Router();

/* GET home page. */
const homePage = (req, res, next) => {
  res.render('index', { title: 'Home Page' })
}




router.get('/', homePage)

module.exports = router
