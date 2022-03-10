// import { validationResult } from 'express-validator';
const { validationResult } = require('express-validator');
// import { startSession } from 'mongoose';
const { startSession } = require('mongoose');

const HttpError = require('../models/http-error');
const { getAddressGeoLocation } = require('../utils/mapLocation');
// import Place from '../models/place';
const Place = require('../models/place');
const User = require('../models/user');

exports.getPlaceByPlaceId = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place;

    try {
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

exports.getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.userId;
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

exports.createPlace = async (req, res, next) => {
    const { title, description, address } = req.body;
    const image = req.file.filename;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'invalid inputs passed, please check your data',
            422
        );
    }

    const locationCordinates = (await getAddressGeoLocation(address)) || {
        lat: -78.91973,
        lng: 36.0094
    };

    const createdPlace = new Place({
        title,
        description,
        image: 'uploads/images/' + image,
        location: locationCordinates,
        address,
        creatorId: req.userData.userId
    });

    let user;

    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        return next(new HttpError('User not found in create place ctrl', 500));
    }

    if (!user) {
        return next(new HttpError("Couldn't find user with provided id", 404));
    }

    try {
        const session = await startSession();
        session.startTransaction();
        await createdPlace.save({ session: session });
        user.places.push(createdPlace);
        await user.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log('err creating place NODE', err);
        return next(
            new HttpError('Creating Place failed, pleas try again', 500)
        );
    }

    res.status(201).json({ place: createdPlace });
};

exports.updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError(
            'Invalid inputs passed, please check your data',
            422
        );
    }

    const placeId = req.params.placeId;
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
        return next(
            new HttpError('We could not find place, try again later', 500)
        );
    }

    if (place.creatorId.toString() !== req.userData.userId) {
        return next(new HttpError('You are not allowed to edit place', 401));
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

exports.deletePlaceById = async (req, res, next) => {
    const placeId = req.params.placeId;

    let place;

    try {
        /**
         *  *findById() ===> used to retrieve document by _id ( mongo DB automatically creates _id )
         */
        place = await Place.findById(placeId).populate('creatorId');
    } catch (err) {
        // throw error here if request/response to DB goes wrong
        return next(
            new HttpError("Something went wrong, couldn't find a place", 500)
        );
    }

    if (!place) {
        return next(
            new HttpError("Something went wrong, couldn't find a place", 404)
        );
    }

    if (place.creatorId.id !== req.userData.userId) {
        return next(
            new HttpError('You are not allowed to delete this place!', 401)
        );
    }

    try {
        const session = await startSession();
        session.startTransaction();
        await place.remove({ session });
        place.creatorId.places.pull(place);
        await place.creatorId.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return next(
            new HttpError("Something went wrong, couldn't find a place", 500)
        );
    }

    res.status(200).json({ message: 'Place deleted!' });
};
