const { User, Thought } = require('../models');

const userController = {
    // GET /api/users
    allUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // GET /api/users/:id
    userById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate([
            { path: 'thoughts', select: '-__v' },
            { path: 'friends', select: '-__v' }
        ])
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);

        });
    },

    // POST /api/users
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // PUT /api/users/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // DELETE /api/users/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            User.updateMany(
                { _id: {$in: dbUserData.friends } },
                { $pull: { friends: params.id } }
            )
            .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                    res.json({ message: 'User has been deleted'});
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    },

    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this userId' });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true, runValidators: true } 
            )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'No user found with this friendId' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    },

    // DELETE /api/users/:userId/friends/:friedId
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this userId' });
                return;
            }
            User.findOneAndUpdate(
                { _id: params.userId },
                {$pull: { friends: params.friendId } },
                { new: true, runValidators: true }
            )
            .then(dbFriendData => {
                if (!dbFriendData) {
                    res.status(404).json({ message: 'No user found with this friendId' })
                    return;
                }
                res.json({ message: 'Friend has been deleted :(' });
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;