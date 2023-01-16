import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes/routes.js'

dotenv.config();

const app = express();
const APP_PORT = 5000;
app.use(cors({ origin: true }));
app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({"Hello": "World",
            "Version": 2})
})

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(APP_PORT, () => {
        console.log(`api listening at http://localhost:${APP_PORT}`)
    }))
    .catch((error) => console.log(error));
