import { Router } from 'express';

import {
    getPlaceByPlaceId,
    getPlaceByUserId,
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

router.get('/user/:userId', getPlaceByUserId);

router.post('/', createPlace);

router.patch('/:placeId', updatePlaceById);

router.delete('/:placeId', deletePlaceById);

export default router;
