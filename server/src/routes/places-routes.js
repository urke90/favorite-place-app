// import { Router } from 'express';
const { Router } = require('express');
const { check } = require('express-validator');

const { checkAuth } = require('../middlewares/check-auth');
const { fileUpload } = require('../middlewares/file-upload');

// import {
//     getPlaceByPlaceId,
//     getPlacesByUserId,
//     createPlace,
//     updatePlaceById,
//     deletePlaceById
// } from '../controllers/places-controllers';
const {
    getPlaceByPlaceId,
    getPlacesByUserId,
    createPlace,
    updatePlaceById,
    deletePlaceById
} = require('../controllers/places-controllers');

const router = Router();

/**
 * THE ROUTE ALREADY STARTS WITH /api/places defined in index.ts
 * when adding extra path DON'T add /api/places since it's already accounted in
 * if we have async calls then we should use next() and pass error with code, else we can throw new error
 */

router.get('/:placeId', getPlaceByPlaceId);

router.get('/user/:userId', getPlacesByUserId);

router.use(checkAuth);

router.post(
    '/',
    fileUpload.single('image'),
    [
        (check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty())
    ],
    createPlace
);

router.patch(
    '/:placeId',
    [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
    updatePlaceById
);

router.delete('/:placeId', deletePlaceById);

module.exports = router;
