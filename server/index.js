const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./error-handler');

const { mongoose } = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3000);


app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/*', function (req, res) {
//     res.sendFile('index.html', { root: path.join(__dirname, 'dist') });
// });

app.use('/api', require('./routes/task.routes'));

app.use(errorHandler);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});