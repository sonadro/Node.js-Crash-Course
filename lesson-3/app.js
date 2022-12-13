const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://ostemannen:H1W7i6KdK7P5a-7E1ZKVs1FYBC-5qhw7HlThWac96UwKgsKBtN@node-tutorials.j2nbgno.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// Static files
app.use(express.static('public'));

// Third-party middleware
app.use(morgan('dev'));

// Serve sites
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found' });
});