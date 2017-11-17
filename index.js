const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();
const allCats = [
    {
        imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
        imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
        name: 'Fluffy',
        gender: 'Female',
        age: 2,
        breed: 'Bengal',
        story: 'Thrown on the street'
    }
];
const allDogs = [
    {
        imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
        imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
        name: 'Zeus',
        gender: 'Male',
        age: 3,
        breed: 'Golden Retriever',
        story: 'Owner Passed away'
    }, 
    {
        imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
        imageDescription: 'testing',
        name: 'Zeus',
        gender: 'Male',
        age: 3,
        breed: 'Golden Retriever',
        story: 'Owner Passed away'
    }
];

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/api/cat', (req, res) => {
    res.json(allCats[allCats.length - 1]);
})

app.get('/api/dog', (req, res) => {
    res.json(allDogs[allDogs.length -1]);
})

app.delete('/api/cat', (req, res) => {
    res.json(allCats.pop())
})

app.delete('/api/dog', (req, res) => {
    res.json(allDogs.pop())
})

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = { app };
