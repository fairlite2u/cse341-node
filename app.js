// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// // const expressHbs = require('express-handlebars'); // To import Handlebars

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// // // To set view engine to Handlebars
// // app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// // app.set('view engine', 'hbs');
// // app.set('views', 'views');

// // // To set view engine to Pug
// // app.set('view engine', 'pug');
// // app.set('views', 'views');

// const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
// app.use(shopRoutes);

// app.use((req, res, next) => {
//   // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
//   res.status(404).render('404', {pageTitle: 'Page Not Found'});
// });

// app.listen(3000);

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);

