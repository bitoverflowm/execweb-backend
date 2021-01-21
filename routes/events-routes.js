const express = require('express');

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
        attendees: ['John Hamm', 'Michael Moore'],
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
        attendees: ['John Hamm', 'Michael Moore'],
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
        attendees: ['John Hamm', 'Michael Moore'],
        event_details: 'description holder',        
    }
];

router.get('/', (req, res, next) => {
    console.log('GET Request in events');
    res.json({message: "Getting all events"});
});

router.get('/:eid', (req, res, next) => {
    console.log('GET Request in events');
    const eventId = req.params.eid;
    const event = DUMMY_EVENTS.find(e => {
        return e.id === eventId;
    });

    res.json({event: event});
});


module.exports = router;