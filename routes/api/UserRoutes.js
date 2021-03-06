const router = require("express").Router();

const {
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    getAllUsers,
    getUserById
} = require("../../controllers/UserController");

router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;