const Joi = require('joi')

module.exports = {
  insert: {
    first_name: Joi.string().required().min(1).max(255),
    last_name: Joi.string().required().min(1).max(255),
    biography: Joi.string(),
    portrait_url: Joi.string().max(255)
  },
  search: {
    id: Joi.number().integer()
  }
}
