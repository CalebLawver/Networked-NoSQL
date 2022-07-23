const router = require('express').Router();
const {
    // route names
} = require('../../controllers/user-controller');

router
    .route('/')

router
    .route('/:id');

router
    .route('/:userId/friends/:friendId');

module.exports = router;