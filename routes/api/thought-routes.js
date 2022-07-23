const router = require('express').Router();
const {
    // route names
} = require('../../controllers/thought-controller');

router
    .route('/')

router
    .route('/:id');

router
    .route('/:thoughtId/reactions/');

module.exports = router;