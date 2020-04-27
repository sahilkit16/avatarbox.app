require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const next = require('next');
const { GravatarClient } = require('grav.client');

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = Boolean(process.env.DEV_ENV);

const nx = next({ dev, dir: 'Presentation' });

const handle = nx.getRequestHandler();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))

nx.prepare().then(() => {
    const port = process.env.PORT || 8801;

    app.post('/register', (req, res) => {
        var { email, isProgressive } = req.body;
        var client = new GravatarClient(email, null);
        var redirectUrl = `/?hash=${client.emailHash}`;
        if(isProgressive){
          redirectUrl = redirectUrl.replace("/","/#upload");
        }
        res.redirect(redirectUrl);
    });

    app.get('/*', (req, res) => {
        return handle(req, res);
    })

    http.createServer(app).listen(port, function () {
        console.log(`magic is happening on port ${port}`);
    });
});
