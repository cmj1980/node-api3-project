const Users = require('../users/users-model');
function logger(req, res, next) {
  const timestamp = new Date().toDateString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(userObject => {
      if (userObject == null) {
        next({
          status: 404,
          message: "user not found"
        })
        return;
      }
      req.user = userObject;
      next();
    })
    .catch(next)
}


function validateUser(req, res, next) {
  const {
    name
  } = req.body;
  if (!req.body.name || typeof name !== 'string' || name.trim() === '') {
    next({
      status: 400,
      message: "missing required name field"
    })
    return;
  }
  req.body = {
    name: name.trim()
  }
  next();
}

function validatePost(req, res, next) {
  let {
    text
  } = req.body;
  if (!req.body.text || typeof text !== 'string' || text.trim() === '') {
    next({
      status: 400,
      message: "missing required text field"
    });
    return;
  }
  req.body = {
    text: text.trim(),
    user_id: req.params.id
  }
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
