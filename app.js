const express = require('express');
const bodyParser = require('body-parser');

const eventRoutes = require('./routes/events-routes');

const app = express();

app.use(eventRoutes);

app.listen(5000);