require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const next = require('next');
const cookieSession = require('cookie-session');

const dummyRoute = require('./routes/_dummy');
const calendarRoute = require('./routes/calendar');
const encryptRoute = require('./routes/encrypt');
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://avatarbox:27017/avbx`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) throw new Error('db connection failed');
    console.log('db connected');
  },
);

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = Boolean(process.env.DEV_ENV);

const nx = next({ dev, dir: 'Presentation' });

const handle = nx.getRequestHandler();
const bodyParser = require('body-parser');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  httpOnly: !dev,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './Presentation/views');
app.set('view engine', 'pug');

nx.prepare().then(() => {
    const port = process.env.PORT || 8801;
    
    if(dev){
        app.use('/dummy', dummyRoute);
    }
    
    app.use('/calendar', calendarRoute);

    app.use('/encrypt', encryptRoute);

    app.use('/home', homeRoute);

    app.get('/*', (req, res) => {
        return handle(req, res);
    })

    http.createServer(app).listen(port, function () {
        console.log(`magic is happening on port ${port}`);
    })
});
