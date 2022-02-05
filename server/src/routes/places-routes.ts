import { Router } from 'express';
import { check } from 'express-validator';

import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlaceById,
    deletePlaceById
} from '../controllers/places-controllers';

const router = Router();

/**
 * THE ROUTE ALREADY STARTS WITH /api/places defined in index.ts
 * when adding extra path DON'T add /api/places since it's already accounted in
 * if we have async calls then we should use next() and pass error with code, else we can throw new error
 */

router.get('/:placeId', getPlaceByPlaceId);

router.get('/user/:userId', getPlacesByUserId);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    createPlace
);

router.patch(
    '/:placeId',
    [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
    updatePlaceById
);

router.delete('/:placeId', deletePlaceById);

export default router;
