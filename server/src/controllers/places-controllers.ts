import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { IPlace, ILocation } from '../types/place/place';
import HttpError from '../types/error/http-error';
import { getAddressGeoLocation } from '../utils/mapLocation';
import Place from '../models/place';

let DUMMY_PLACES: IPlace[] = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creatorId: 'u2'
    }
];

export const getPlaceByPlaceId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const placeId: string = req.params.placeId;
    let place;

    try {
        /**
         *  *findById() ===> used to retrieve document by _id ( mongo DB automatically creates _id )
         */
        place = await Place.findById(placeId);
    } catch (err) {
        // throw error here if request/response to DB goes wrong
        return next(
            new HttpError("Something went wrong, couldn't find a place", 500)
        );
    }

    // throw error if place is not found
    if (!place) {
        return next(
            new HttpError(
                "Couldn't find place for the provided PLACE id. CLASS SYNTAX",
                404
            )
        );
    }

    res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId: string = req.params.userId;
    let places;

    try {
        places = await Place.find({ creatorId: userId });
    } catch (err) {
        return next(
            new HttpError(
                "Something went wrong. Couldn't find places for the provided USER id.",
                500
            )
        );
    }

    if (!places || places.length === 0) {
        return next(
            new HttpError("Couldn't find places for the provided USER id.", 404)
        );
    }

    res.json({
        places: places.map((place) => place.toObject({ getters: true }))
    });
};

export const createPlace = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, address, creatorId }: IPlace = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'invalid inputs passed, please check your data',
            422
        );
    }

    const locationCordinates: ILocation = (await getAddressGeoLocation(
        address
    )) || {
        lat: -78.91973,
        lng: 36.0094
    };

    const createdPlace = new Place({
        title,
        description,
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        location: locationCordinates,
        address,
        creatorId
    });

    try {
        // * save() ===  used for saving entry in DB
        await createdPlace.save();
    } catch (err) {
        return next(
            new HttpError('Creating Place failed, pleas try again', 500)
        );
    }

    res.status(201).json({ place: createdPlace });
};

export const updatePlaceById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs passed, please check your data',
            422
        );
    }

    const placeId: string = req.params.placeId;
    const { title, description } = req.body;

    let place;

    try {
        /**
         *  *findById() ===> used to retrieve document by _id ( mongo DB automatically creates _id )
         */
        place = await Place.findById(placeId);
    } catch (err) {
        // throw error here if request/response to DB goes wrong
        return next(
            new HttpError("Something went wrong, couldn't find a place", 500)
        );
    }

    if (!place) {
        return next(new HttpError("Can't find place with id", 404));
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        return next(
            new HttpError("Something went wrong, couldn't find a place", 500)
        );
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
};

export const deletePlaceById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const placeId: string = req.params.placeId;

    const placeToDelete = DUMMY_PLACES.find((p) => p.id === placeId);

    if (!placeToDelete) {
        throw new HttpError('Place to delete not found', 404);
    }

    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
    res.status(200).json({ message: 'Place deleted!' });
};
