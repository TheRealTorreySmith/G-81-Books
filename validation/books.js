const Joi = require('joi')

module.exports = {
  insert: {
    title: Joi.string().required().min(1).max(255),
    genre: Joi.string().required().min(1).max(255),
    biography: Joi.string(),
    cover_url: Joi.string().max(255)
  },
  search: {
    id: Joi.number().integer()
  }
}
