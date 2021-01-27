//external
const { uuid } = require('uuidv4');

const HttpError = require('../models/http-error');


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
];

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

const DUMMY_SPONSOR_SUBMISSION = [
    {
    'id' : 's1',
    't_job_titles' : ['j1', 'j2'],
    't_industry' : ['i1', 'i2'],
    't_client_list' : 'test.csv',
    't_employee_count': 50,
    't_users': ['u1', 'u3'],
    'date_start': 'Feb 1st 2021',
    'date_end' : 'Feb 1st 2021',
    't_topic' : 0,
    't_host' : 0
    }
];


//get all users based on search queries
//TODO: Implement search in database. Add fuzzy logic to improve filtering 
const getUsersBySearch = (req, res, next) => {
    const result = DUMMY_USER_DATA;
    console.log('GET recommended users based on specified filters');

    if(!result){
        throw new HttpError('Could not find any matching users', 404);
    }
    
    res.json({filteredUsers: result});
};

//GET all sponsorSubmissions based on SponsorID
const getSponsorSubmissions = (req, res, next) => {
    const sponsorId = req.params.sId
    const result = DUMMY_SPONSOR_SUBMISSION.filter(ss => {
        return ss.sId === sponsorId
    });
    console.log('GET sponsor request history for ', sponsorId );

    if(!result){
        throw new HttpError('Could not find any matching users', 404);
    }
    
    res.status(200).json({filteredUsers: result});
}

const submitSponsorRequest = (req, res, next) => {
    console.log(req.body);
    const { 
        jobTitles, industry, clientList, employeeCount, users, dateStart, dateEnd, topic, host } = req.body;
    
    const sponsorRequestSubmission = {
        id: uuid(), 
        jobTitles, 
        industry, 
        clientList, 
        employeeCount, 
        users, 
        dateStart,
        dateEnd, 
        topic, 
        host
    };

    DUMMY_SPONSOR_SUBMISSION.push(sponsorRequestSubmission);
    res.status(201).json({sponsorSubmission : sponsorRequestSubmission});
};


//TODO: Sponsor registration

exports.getUsersBySearch = getUsersBySearch;
exports.getSponsorSubmissions = getSponsorSubmissions;
exports.submitSponsorRequest = submitSponsorRequest;