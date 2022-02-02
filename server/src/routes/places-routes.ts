import { Router } from 'express';

import { IPlace } from 'models/place/place';
// import { IUser } from 'models/user/user';

const router = Router();

/**
 * THE ROUTE ALREADY STARTS WITH /api/places defined in index.ts
 * when adding extra path DON'T add /api/places since it's already accounted in
 */

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

router.get('/:placeId', (req, res, next) => {
    const placeId: string = req.params.placeId;

    const place = DUMMY_PLACES.find((p) => p.id === placeId);

    // throw error if place is not found
    if (!place) {
        return res.status(404).json({
            message: "Couldn't find place for the provided PLACE id."
        });
    }

    res.json({ place });
});

router.get('/user/:userId', (req, res, next) => {
    const userId: string = req.params.userId;

    const place = DUMMY_PLACES.find((p) => p.creatorId === userId);
    if (!place) {
        return res.status(404).json({
            message: "Couldn't find place for the provided USER id."
        });
    }

    res.json({ place });
});

export default router;
