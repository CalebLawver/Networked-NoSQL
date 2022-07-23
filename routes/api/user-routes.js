const router = require('express').Router();
const {
    // route names
    allUsers,
    userById,
    createUser,
    updateUser,
    deleteUser,
    deleteFriend,
} = require('../../controllers/user-controller');

router.route('/')
    .get(allUsers)
    .post(createUser);

router.route('/:id')
    .get(userById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(deleteFriend);

module.exports = router;