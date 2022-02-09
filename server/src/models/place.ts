import mongoose, { Schema, Types, Document } from 'mongoose';

// import { IPlace } from 'types/place/place';

export interface IPlace {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    location: ILocation;
    creatorId: any;
}

export interface ILocation {
    lat: number;
    lng: number;
}

/**
 *  creatorId ====> will be replaced with id that mongo provides
 * TODO <IPlace>  removed as generic from Schema, figure out a way to implement it again
 */

const placeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Place = mongoose.model<IPlace & Document>('Place', placeSchema);

export default Place;
