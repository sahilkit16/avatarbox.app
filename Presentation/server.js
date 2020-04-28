require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const next = require('next');
const { exec, execSync } = require('child_process');
const { GravatarClient } = require('grav.client');
const { join } = require('path');
const CacheService = require('../Services/cache.service');

// workaround for dev container
// see https://github.com/zeit/next.js/issues/4022
const dev = Boolean(process.env.DEV_ENV);

const nx = next({ dev, dir: 'Presentation' });

const handle = nx.getRequestHandler();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './Presentation/views');
app.set('view engine', 'pug');

nx.prepare().then(() => {
    const port = process.env.PORT || 8801;

    app.post('/register', (req, res) => {
        const { email, user, isProgressive, ciphertext } = req.body;
        let client, redirectUrl = "/";
        if(email){
            client = new GravatarClient(email, null);
            redirectUrl += `?user=${client.emailHash}`;
            CacheService.set(client.emailHash, email);
        }
        if(isProgressive){
          redirectUrl += "#hero";
        }
        if(ciphertext && user){
          const path = join(__dirname, '../_/rsa.private');
          const _email = CacheService.get(user);
          const password = execSync(`echo ${ciphertext.trim()} | base64 -d | openssl rsautl -decrypt -inkey ${path}`).toString();
          client = new GravatarClient(_email.trim().toString(), password.trim().toString());
          client.userImages().then(result => {
            res.render("dashboard", { images: result.Value.userImages });
          }).catch((err) => {
            console.log(err);
            res.end();
          });
        } else {
          res.redirect(redirectUrl);
        }
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
