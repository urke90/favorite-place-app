const mongoose = require('mongoose');
// import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;
/**
 * TODO places: Types.ObjectId; ---> inspect TS with mongoose Types.ObjectID....
 */

/**
 * have unique email will speed up the query process
 * * places will hold the IDs of all places user has visited
 * TODO uniqueValidator ===> check how it workd, can we shorthen the code below
 */

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
        required: true
    },
    places: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Place'
        }
    ]
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
