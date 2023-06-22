const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;

const passport = require('passport');
path = require('path');

//passport config
require('./config/passport')(passport);

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true})); // middleware Loding stop
app.use(bodyParser.json());

app.set('views', './views');
app.set('view engine', 'ejs')

// create own model
const mongodb = require('./config/Database/connectDatabase') // database connect

// bulk data send in data base 
const seedr = require('./migration/seedr')


// User login then hide button signin signup
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});


// import routes from views folder
const routes = require('./controllers/routes/routes')
const user = require('./controllers/routes/userRoutes')
const admin = require('./controllers/routes/admin')
const tour = require('./controllers/routes/tour')

// import routes from controller
const routerschema = require('./controllers/schemaroute/schemaroutes')

app.use('/', routes); // important part of routes
app.use('/', user); // important part of routes
app.use('/', admin); // important part of routes
app.use('/', tour); // important part of routes

app.get('/sitemap.xml', async function (req, res) {
    try {
        res.sendFile('sitemap.xml', { root: path.join(__dirname, './') });
    } catch (e) {
        // Catch errors
        console.log(e);
    }
});

app.get('/BingSiteAuth.xml', async function (req, res) {
    try {
        res.sendFile('BingSiteAuth.xml', { root: path.join(__dirname, './') });
    } catch (e) {
        // Catch errors
        console.log(e);
    }
});

// 404 page 
app.use((req, res, next) => {
    res.render('404');
})

app.listen(PORT, console.log('server start from port no 3000'))