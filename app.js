const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require('cors'); 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const corsOptions = {
  origin: "https://cse341-fairlite2u.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://fairlite2u:7UbHyjQbhaXAbCN@cluster0.vnfxf.mongodb.net/shop?retryWrites=true&w=majority";


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f173f14ea29ae9ec858590')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URL, options
    // "mongodb+srv://fairlite2u:7UbHyjQbhaXAbCN@cluster0.vnfxf.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Jennifer',
          email: 'jen@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });