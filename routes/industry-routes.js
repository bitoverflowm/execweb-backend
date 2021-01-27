const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_INDUSTRY = [
    {
        id: 'i1',
        title: 'Chief Information Officer'
    },
    {
        id: 'i2',
        title: 'Chief Executive Officer'
    },
    {
        id: 'i3',
        title: 'Chief Technology Officer'
    },
] 

router.get('/', (req, res, next) => {
    console.log('GET all job titles.');
    res.json({industries: DUMMY_INDUSTRY});
})

//Add new Industry

module.exports = router;