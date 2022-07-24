const { User, Thought } = require('../models');

const thoughtController = {
    allThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
          })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
        // .populate({ path: 'reactions', select: '-__v' })
        // .select('-__v')
        // .then(dbThoughtData => res.json(dbThoughtData))
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
    },

    thoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
  },

    createThought({ params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId},
                { $push: {thoughts: _id }}, {new: true});
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this ID found.' });
                return;
            }
            res.json(dbThoughtData)
        }) 
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that ID' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;