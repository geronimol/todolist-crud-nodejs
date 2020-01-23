'use strict'
const express = require('express');
const app = express();
const cors = require('cors');

const { mongoose } = require('./database');

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/task.routes'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});