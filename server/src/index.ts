import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';

/**
 * * Routes
 * ! DANGER =====>  check diff when importin ()
 */

// import placeRoutes from 'routes/places-routes';
// import userRoutes from './routes/users-routes';

import placeRoutes from './routes/places-routes';
import userRoutes from './routes/users-routes';
import HttpError from './types/error/http-error';

const app = express();

/**
 * *MIDDLEWARES
 * ? should we use body-parser instead of body-parser
 */

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);

app.use(() => {
    const error = new HttpError("Couldn't find this route", 404);
    throw error;
});

const errorMiddleWare: ErrorRequestHandler = (error, req, res, next) => {
    if (res.headersSent) return next(error);

    res.status(error.errorCode || 500).json({
        message: error.message || 'An unknown error occured!!!'
    });
};

app.use(errorMiddleWare);

/**
 * * establish connection to the mongo db before we connect to the server
 * ! mongodb+srv://urke90:xLTqhzl07eBkPKS7@visit-places.sqptd.mongodb.net/visit-places?retryWrites=true&w=majority
 */

mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then(() => {
        console.log('mongo connected');

        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log('error connecting to Mongo mongoose');
    });
