const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET Request in events');
    res.json({message: "Getting all events"});
});

module.exports = router;