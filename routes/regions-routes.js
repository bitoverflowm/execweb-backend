const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_REGIONS = [
    {
        id: '1',
        title: 'West'
    },
    {
        id: '2',
        title: 'Mid-west'
    },
    {
        id: '3',
        title: 'South West'
    },
    {
        id: '4',
        title: 'North East'
    },
    {
        id: '5',
        title: 'South West'
    },
    {
        id: '6',
        title: 'South East'
    },
] 

router.get('/', (req, res, next) => {
    console.log('GET all job titles.');
    res.json({regions: DUMMY_REGIONS});
})

module.exports = router;