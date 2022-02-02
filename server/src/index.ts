import express from 'express';
import cors from 'cors';

/**
 * Routes
 */
import placesRoutes from './routes/places-routes';

const app = express();

/**
 * MIDDLEWARES
 *  ******* should we use body-parser instead of body-parser ******
 */
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
app.use('/api/places', placesRoutes);

app.listen(5000);
