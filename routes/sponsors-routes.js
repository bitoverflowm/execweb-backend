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





module.exports = router;