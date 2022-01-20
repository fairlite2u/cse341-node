const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res, next) => {
  res.render('users', {
    path: '/users',
    pageTitle: 'Users', 
    users: users, 
    activeUsers: true
  });
});

app.get('/', (req, res, next) => {
  res.render('index', {
    path: '/',
    pageTitle: 'Add User',
    activeAddUsers: true
  });
});

app.post('/add-user', (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect('/users');
});

app.listen(3000);