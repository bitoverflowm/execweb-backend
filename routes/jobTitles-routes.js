const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_JOB_TITLE = [
    {
        id: 'j1',
        title: 'Chief Information Officer'
    },
    {
        id: 'j2',
        title: 'Chief Executive Officer'
    },
    {
        id: 'j3',
        title: 'Chief Technology Officer'
    },
]; 

router.get('/', (req, res, next) => {
    console.log('GET all job titles.');
    res.json({jobTitles: DUMMY_JOB_TITLE});
})

//add new job title


module.exports = router;