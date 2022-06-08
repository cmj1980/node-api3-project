function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger')
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId')
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost')
  next()
}

// do not forget to expose these functions to other modules
module.exports = { 
  logger,
  validateUserId,
  validateUser,
  validatePost, 
};
