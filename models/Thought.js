const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Your thought can't be empty!",
            min: 1,
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            ReactionSchema
        ],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false  
    }  
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;