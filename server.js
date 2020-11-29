const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    }
})

app.get('/', (req, res) => {
    res.send("Server is working",)
})

//Get coupon code                   ->Get
//update coupon status to used      ->Put
//Add new highscore to top          ->Post

app.post('/register', register.handleRegister(database, bcrypt));

app.post('/signin', signin.handleSignin(database, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(database));

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.put('/image', (req, res) => { image.handleImageCount(req, res, database)})

const PORT = process.env.PORT
app.listen(PORT, () => { console.log("App is running on port", PORT) })