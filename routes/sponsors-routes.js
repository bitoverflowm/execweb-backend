const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_SPONSORS = [
    {
        id: 's1',
        email: 'test@test.com',
        linkedin_profile: {
            linkedin_id : 'lid1',
            first_name : 'Rikesh',
            last_name : 'Thapa',
            profile_picture : 'https://media-exp1.licdn.com/dms/image/C4E03AQFMoxXefPzXQg/profile-displayphoto-shrink_200_200/0/1590614284813?e=1617235200&v=beta&t=2tDqFizcGJNt-ZEJvA5gXk0z--wfQk7qOuy51CapAL8',
        },
        linkedin_email: 'test@test.com',
        verified: 1,
        sponsorship_submission: 'ss1'
    }
];

const DUMMY_USER_SEARCH = [
    {
        titles : ['Chief Information Officer'],
        industry : ['Financial Services'],
        employtees : '50',
        regions : ['west', 'south-west']
    }
]

const DUMMY_USER_DATA = [
    {
        id: 'u1',
        first_name: 'name 1',
        last_name: 'lname1',
        position: 'VP Technology',
    },
    {
        id: 'u2',
        first_name: 'name 2',
        last_name: 'lname2',
        position: 'Chief Information Officer',
    },
    {
        id: 'u3',
        first_name: 'name 3',
        last_name: 'lname3',
        position: 'Chief Information Officer',
    }
];


router.get('/search', (req, res, next) => {
    const result = DUMMY_USER_DATA;
    console.log('GET resommended users');
    if(!result){
        throw new HttpError('Could not find any matching users', 404);
    }
    
    res.json({users: result});
});

//submit Sponsor event creation request


//get sponsorship requests 
// enspoint to get list of all submissions made buy given user



module.exports = router;