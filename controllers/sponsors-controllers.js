//external
const { v4:uuid } = require('uuid');
const Fuse = require('fuse.js');

const HttpError = require('../models/http-error');
const SponsorRequest = require('../models/sponsor-request');
const TargetUsers = require('../models/target-user')


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
        employees : '50',
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
const getUsersBySearch = async (req, res, next) => {

    let targetUsers;

    try {
        targetUsers = await TargetUsers.find();
        console.log('Pulling all usesrs:', targetUsers)
    } catch (err) {
        const error = new HttpError(
            'Something when wrong, could not find any targetUsers.', 500
        );
        return next(error);
    }

    if(!targetUsers){
        const error =  new HttpError('Could not find any matching users', 404);
        return next(error);
    }

    //Lets start the filter
    const options = {
        //note: regions is eliminated from search
        keys: ["Position", "Industry"]
    }

    let fuse;

    try{
        //fuse = await new Fuse(targetUsers.toObject({getters: true}), options);
        fuse = await new Fuse(targetUsers, options);
    } catch (err) {
        const error = new HttpError(
            'Unable to format search user data.', 500
        );
        return next(error);
    }

    const { jobTitles, industries } = req.body;
    const searchQuery = jobTitles.join(' ') + industries.join(' ');
    console.log('searching with filters: ', searchQuery);

    let filteredUsers;

    try{
        filteredUsers = await fuse.search(searchQuery);
        console.log(filteredUsers);
        console.log("Search completed")
    } catch (err) {
        const error = new HttpError(
            'Unable to conduct search operation.', 500
        );
        return next(error);
    }

    res.json({filteredUsers: filteredUsers});
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


// Sponsor Signup
// linkedin validation logic


// Create Sponsor Request

const createSponsorRequest = async (req, res, next) => {
    const { 
        jobTitles, industries, clientList, headCounts, regions, users, dateStart, dateEnd, topic, host, sponsor } = req.body;
    
    const sponsorRequestSubmission = new SponsorRequest({
        jobTitles, 
        industries, 
        clientList, 
        headCounts,
        regions, 
        users, 
        dateStart,
        dateEnd, 
        topic, 
        host,
        sponsor
    });

    console.log('POST Submit sponsor request ', sponsorRequestSubmission );

    try {
        await sponsorRequestSubmission.save();
    } catch (err) {
        const error = new HttpError(
            'Creating sponsor request failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({sponsorSubmission : sponsorRequestSubmission});
};


//TODO: Sponsor registration

exports.getUsersBySearch = getUsersBySearch;
exports.getSponsorSubmissions = getSponsorSubmissions;
exports.createSponsorRequest = createSponsorRequest;