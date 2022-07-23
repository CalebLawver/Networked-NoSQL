const { Schema, model } = require('mongoose');

var emailValidator = function(email) {
    var mail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"; 
    return mail.test(email);
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'A username is required!',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'An email is required!',
        validate: [emailValidator, 'Please input a valid email address']
    }, 
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const User = model('User', UserSchema);

module.exports = User;