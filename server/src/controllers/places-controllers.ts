import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import { IPlace, ILocation } from '../types/place/place';
import HttpError from '../types/error/http-error';
import { getAddressGeoLocation } from '../utils/mapLocation';

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

export const getPlaceByPlaceId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const placeId: string = req.params.placeId;

    const place = DUMMY_PLACES.find((p) => p.id === placeId);

    // throw error if place is not found
    if (!place) {
        return next(
            new HttpError(
                "Couldn't find place for the provided PLACE id. CLASS SYNTAX",
                404
            )
        );
    }

    res.json({ place });
};

export const getPlacesByUserId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId: string = req.params.userId;

    const places = DUMMY_PLACES.filter((p) => p.creatorId === userId);

    if (!places || places.length === 0) {
        // CAN BE DONE IN THIS WAY, BUT WILL USE ERROR CLASS LIKE ^^^
        // return res.status(404).json({
        //     message: "Couldn't find place for the provided USER id."
        // });
        return next(
            new HttpError("Couldn't find places for the provided USER id.", 404)
        );
    }

    res.json({ places });
};

export const createPlace = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, location, address, creatorId }: IPlace =
        req.body;

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

    const newPlace: IPlace = {
        id: uuidv4(),
        title,
        description,
        imageUrl: '',
        location: locationCordinates,
        address,
        creatorId
    };

    DUMMY_PLACES.push(newPlace);

    res.status(201).json({ place: newPlace });
};

export const updatePlaceById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'invalid inputs passed, please check your data',
            422
        );
    }

    const placeId: string = req.params.placeId;

    const { title, description } = req.body;

    const placeToUpdate = DUMMY_PLACES.find((p) => p.id === placeId);

    if (!placeToUpdate) return;

    placeToUpdate.title = title;
    placeToUpdate.description = description;

    const updatePlaceIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

    DUMMY_PLACES[updatePlaceIndex] = placeToUpdate;

    res.status(200).json({ place: placeToUpdate });
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
