import { Router } from 'express';

import { IPlacesState } from 'models/places/places';

const router = Router();

const DUMMY_PLACES: IPlacesState[] = [
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
    if (!place) throw new Error(`Place with id: ${placeId} not found!!!`);

    res.json({ place });
});

export default router;
