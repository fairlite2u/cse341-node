const path = require('path');

const express = require('express');

const mainRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);
app.use(userRoutes);

// app.use((req, res, next) => {
//   console.log('Me first');
//   next();
// });

// app.use((req, res, next) => {
//   console.log ('Me second');
//   res.send('<p>I went on a journey through two middleware functions</p>');
// });

// app.use('/users', (req, res, next) => {
//   console.log('/users');
//   res.send('<p>Here is my users page</p>');
// });

// app.use('/', (req, res, next) => {
//   console.log('slash');
//   res.send('<p>Here is my slash page</p>');
// });

app.listen(3000);