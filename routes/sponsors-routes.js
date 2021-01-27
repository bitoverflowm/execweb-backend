//external imports
const express = require('express');


const sponsorsControllers = require('../controllers/sponsors-controllers');

const router = express.Router();

router.get('/userSearch', sponsorsControllers.getUsersBySearch);

router.get('/:sId/sponsorSubmissions', sponsorsControllers.getSponsorSubmissions);

//submit Sponsor event creation request
router.post('/sponsorRequest', sponsorsControllers.submitSponsorRequest);

//get sponsorship requests 
// endpoint to get list of all submissions made buy given user


module.exports = router;