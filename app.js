const express = require('express');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events-routes');
const sponsorRoutes = require('./routes/sponsors-routes');
const jobTitles = require('./routes/jobTitles-routes');


const app = express();

app.use('/api/events', eventRoutes);

app.use('/api/sponsors', sponsorRoutes);

app.use('/api/jobTitles', jobTitles);

app.use((error, req, res, next) => {
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);