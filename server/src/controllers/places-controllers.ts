import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { IPlace } from '../models/place/place';
import HttpError from '../models/error/http-error';

const DUMMY_PLACES: IPlace[] = [
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

export const getPlaceByUserId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId: string = req.params.userId;

    const place = DUMMY_PLACES.find((p) => p.creatorId === userId);

    if (!place) {
        // CAN BE DONE IN THIS WAY, BUT WILL USE ERROR CLASS LIKE ^^^
        // return res.status(404).json({
        //     message: "Couldn't find place for the provided USER id."
        // });
        return next(
            new HttpError("Couldn't find place for the provided USER id.", 404)
        );
    }

    res.json({ place });
};

export const createPlace = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, location, address, creatorId }: IPlace =
        req.body;

    const newPlace: IPlace = {
        id: uuidv4(),
        title,
        description,
        location,
        address,
        creatorId
    };

    DUMMY_PLACES.push(newPlace);

    res.status(201).json({ place: newPlace });
};
