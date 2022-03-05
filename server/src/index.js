const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const placeRoutes = require('./routes/places-routes.js');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

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

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);

app.use(() => {
    const error = new HttpError("Couldn't find this route", 404);
    throw error;
});

const errorMiddleWare = (error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log('err with uploaded file');
        });
    }
    if (res.headersSent) return next(error);

    res.status(error.errorCode || 500).json({
        message: error.message || 'An unknown error occured!!!'
    });
};

app.use(errorMiddleWare);

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('mongo connected');

        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log('error connecting to Mongo mongoose', err);
    });
