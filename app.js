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

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

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

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u3lfs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, options)
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });