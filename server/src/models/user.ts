import mongoose, { Schema, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
    places: Types.ObjectId;
}

/**
 * have unique email will speed up the query process
 * * places will hold the IDs of all places user has visited
 * TODO uniqueValidator ===> check how it workd, can we shorthen the code below
 */

const userSchema = new Schema<IUser>({
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
    avatar: {
        type: String,
        required: true
    },
    places: [
        {
            type: Types.ObjectId,
            required: true,
            ref: 'Place'
        }
    ]
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

export default User;
