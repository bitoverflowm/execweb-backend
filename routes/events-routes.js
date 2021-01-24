const express = require('express');

const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_EVENTS = [
    {
        id: '1',
        title: 'How to recruit cybersecurity',
        date_start: 'Fri Oct 23 - 12:30 PM',
        date_end: 'Fri Oct 23 - 1:30 PM',
        date_created: 'Jan 1st 2020',
        cover_image: './assets/img1.jpg',
        zoom_link: 'temp',
        topic: 'Cybersecurity',
        host: 'Imam Farrhouk',
        sponsor: 'Kentucky Fried Chicken',
        attendees: ['1', '2'],
        event_details: 'description holder',        
    },
    {
        id: 'e2',
        title: 'How to recruit cybersecurity',
        date_start: 'Fri Oct 23 - 12:30 PM',
        date_end: 'Fri Oct 23 - 1:30 PM',
        date_created: 'Jan 1st 2020',
        cover_image: './assets/img1.jpg',
        zoom_link: 'temp',
        topic: 'Cybersecurity',
        host: 'Imam Farrhouk',
        sponsor: 'Kentucky Fried Chicken',
        attendees: ['2'],
        event_details: 'description holder',        
    },
    {
        id: 'e3',
        title: 'How to recruit cybersecurity',
        date_start: 'Fri Oct 23 - 12:30 PM',
        date_end: 'Fri Oct 23 - 1:30 PM',
        date_created: 'Jan 1st 2020',
        cover_image: './assets/img1.jpg',
        zoom_link: 'temp',
        topic: 'Cybersecurity',
        host: 'Imam Farrhouk',
        sponsor: 'Kentucky Fried Chicken',
        attendees: ['1'],
        event_details: 'description holder',        
    }
];

router.get('/', (req, res, next) => {
    console.log('GET all events');
    res.json({events:DUMMY_EVENTS, 
            message: "Getting all events"});
});

router.get('/:eid', (req, res, next) => {
    const eventId = req.params.eid;
    console.log('GET event by event ID', eventId);
    const event = DUMMY_EVENTS.filter(e => {
        return e.id === eventId;
    });

    if(!event){
        throw new HttpError('Could not find event for the provided id.', 404);
    }

    res.json({event: event});
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    console.log('GET event by user ID', userId);
    const events = DUMMY_EVENTS.filter(e => {
        return e.attendees.includes(userId);
    });

    res.json({events: events});
});


module.exports = router;