const { Thought, User } = require("../models");

const thoughtController = {
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: "No user found"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
            .then(updatedThought => {
                if(!updatedThought) {
                    res.status(404).json({ message: "No thought found"});
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getAllThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;