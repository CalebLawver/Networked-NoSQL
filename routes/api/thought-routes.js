const router = require('express').Router();
const {
    // route names
    allThoughts,
    thoughtById,
    createThought,
    updateThought,
    deleteThought,
    deleteReaction,
    addReaction,
} = require('../../controllers/thought-controller');

router.route('/')
    .get(allThoughts)
    .post(createThought);

router.route('/:id')
    .get(thoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;