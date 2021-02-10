const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events-routes');
const sponsorRoutes = require('./routes/sponsors-routes');
const jobTitles = require('./routes/jobTitles-routes');
const industries = require('./routes/industry-routes');
const regions = require('./routes/regions-routes');


const app = express();
const HttpError = require('./models/http-error');
const { Mongoose } = require('mongoose');

app.use(bodyParser.json());

app.use('/api/events', eventRoutes);

app.use('/api/sponsors', sponsorRoutes);

app.use('/api/jobTitles', jobTitles);

app.use('/api/industry', industries);

app.use('/api/regions', regions);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!'});
});

mongoose
    .connect('mongodb+srv://test1:hello123@cluster0.u3lfs.mongodb.net/execweb?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });

