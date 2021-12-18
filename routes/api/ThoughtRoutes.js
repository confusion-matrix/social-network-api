const router = require("express").Router();

const {
    createThought,
    updateThought,
    getAllThoughts,
    getAllThoughtsById,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/ThoughtController');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .post(createThought)
    .get(getAllThoughtsById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;