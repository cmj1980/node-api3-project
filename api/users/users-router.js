const express = require('express')
const Users = require('./users-model')
const Post = require('../posts/posts-model')

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(arr => {
    res.json(arr);
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(deleteCount => {
      return deleteCount ? res.json(req.user) : next({
        status: 503,
        message: 'Service Unavailable'
      });
    })
    .catch(next);
});


router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then(postsArr => res.json(postsArr))
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Post.insert(req.body)
  .then(newUserPost => res.json(newUserPost))
  .catch(next)
});

// do not forget to export the router
module.exports = router
