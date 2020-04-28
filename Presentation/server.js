require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const next = require('next');
const { exec } = require('child_process');
const { GravatarClient } = require('grav.client');
const { join } = require('path');

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = Boolean(process.env.DEV_ENV);

const nx = next({ dev, dir: 'Presentation' });

const handle = nx.getRequestHandler();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './Presentation/views');
app.set('view engine', 'pug');

nx.prepare().then(() => {
    const port = process.env.PORT || 8801;

    app.post('/register', (req, res) => {
        var { email, isProgressive, ciphertext } = req.body;
        var client = new GravatarClient(email, null);
        var redirectUrl = `/?hash=${client.emailHash}`;
        if(isProgressive){
          redirectUrl += "#hero";
        }
        if(ciphertext){
          const path = join(__dirname, '../_/rsa.private');
          exec(`echo ${ciphertext} | base64 -d | openssl rsautl -decrypt -inkey ${path}`,
          (err, sdtout) => {
              if(err) throw err;
              console.log(sdtout);
              //res.render("dashboard", { ciphertext: sdtout });
          });
        }
        res.redirect(redirectUrl);
    });

    app.post('/encrypt', (req, res) => {
        const { password } = req.body;
        exec(`echo ${password} | openssl rsautl -encrypt -inkey rsa.public -pubin | base64 -w 0`,
        (err, sdtout) => {
            if(err) throw err;
            res.render("ciphertext", { ciphertext: sdtout });
        });
    });

    app.get('/*', (req, res) => {
        return handle(req, res);
    })

    http.createServer(app).listen(port, function () {
        console.log(`magic is happening on port ${port}`);
    });
});
