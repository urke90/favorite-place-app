import mongoose, { Schema } from 'mongoose';

// import { IPlace } from 'types/place/place';

interface IPlace {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    location: ILocation;
    creatorId: string;
}

interface ILocation {
    lat: number;
    lng: number;
}

/**
 *  creatorId ====> will be replaced with id that mongo provides
 */

const placeSchema = new Schema<IPlace>({
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
        type: String,
        required: true
    }
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
