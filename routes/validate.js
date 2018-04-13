const boom = require('boom')
const validate = require('express-validation')

function checkBookData(req, res, next) {
  console.log(req.body);
  const { title, genre, description, cover_url, authors } = req.body
  if (!title) {
    next(boom.badRequest('Title is required'))
  }
  if (!genre) {
    next(boom.badRequest('Genre is required'))
  }
  if (!authors) {
    next(boom.badRequest('One or more authors are required'))
  }
  next()
}

module.exports = {
  checkBookData
}
