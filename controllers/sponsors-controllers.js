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
    const { jobTitles, industries, headCounts } = req.body;
    const jobTitleSearchQuery = jobTitles.join(' ');
    const industrySearchQuery = industries.join(' ');

    let headCountQuery = [].concat(...headCounts)
    let sortedHeadCount = headCountQuery.sort();
    const minHeadCount = sortedHeadCount[0];
    const maxHeadCount = sortedHeadCount[sortedHeadCount.length -1];



    //pulling all users from db filtered by headcount
    try {
        let returnedtUsers = await TargetUsers.find();
        targetUsers = returnedtUsers.filter(returnedtUsers => Number(returnedtUsers['# of Employees']) >= minHeadCount && Number(returnedtUsers['# of Employees']) <= maxHeadCount);
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

    let filteredUsers;

    try{
        const fuse_job_title = await new Fuse(targetUsers, {keys: ["Position"]});
        filteredUsers = await fuse_job_title.search(jobTitleSearchQuery);
    } catch (err) {
        const error = new HttpError(
            'Unable to format search user data.', 500
        );
        return next(error);
    }

    try{
        if (filteredUsers.length === 0) {
            filteredUsers = targetUsers;
        }
        const fuse_industry = await new Fuse(filteredUsers, {keys: ["item.Industry"]});
        newFilteredUsers = await fuse_industry.search(industrySearchQuery);
        if (newFilteredUsers.length === 0){
            const fuse_formatting = await new Fuse(filteredUsers, {keys: ["item.Position"]});
            newFilteredUsers = await fuse_formatting.search(jobTitleSearchQuery);
        }
    } catch (err) {
        const error = new HttpError(
            'Unable to conduct search operation.', 500
        );
        return next(error);
    }

    res.json({filteredUsers: newFilteredUsers});
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
        jobTitles, industries, clientList, headCounts, regions, users, dates, topic, host, sponsor } = req.body;
    
    const sponsorRequestSubmission = new SponsorRequest({
        jobTitles, 
        industries, 
        clientList, 
        headCounts,
        regions, 
        users, 
        dates, 
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