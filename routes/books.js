var express = require('express');
var router = express.Router();

/* GET home page. */
const allBooks = (req, res, next) => {
  res.render('index', { title: 'Books Home Page' })
}





router.get('/', allBooks)

module.exports = router
