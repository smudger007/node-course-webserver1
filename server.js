const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// hbs is a 'Handlebars' wrapper module. Handlebars is a Templating Engine.

var app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// Register some Express Middleware.

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url} `;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
    } );

    next();
});




app.get('/', (req,res) => {
    
    res.render('home.hbs', {
        pageTitle: 'Home Page...',  
        welcomeMessage: 'Hello Smudger - this is the welcome page'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page...'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'FATAL: System has crashed', 
        test: 'This is just a test message'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
