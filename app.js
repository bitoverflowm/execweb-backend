const express = require('express');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events-routes');
const sponsorRoutes = require('./routes/sponsors-routes');
const jobTitles = require('./routes/jobTitles-routes');
const industries = require('./routes/industry-routes');
const regions = require('./routes/regions-routes');


const app = express();
const HttpError = require('./models/http-error');

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

app.listen(5000);