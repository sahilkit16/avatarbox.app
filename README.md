# avatarbox.web

web server for [avatarbox.io](https://avatarbox.io)

---

![avatarbox architecture](http://avatarbox.surge.sh/architecture.png)

## Getting Started

**`avatarbox.web`** is a user-facing [Next.js](https://nextjs.org) application that allows visitors to set up *Automated Updates* for their [Gravatar](https://www.gravatar.com) icon.

### Prerequisites

|Must have|Nice to have|
|---|---|
|[Gravatar](https://en.gravatar.com/) account|[Docker](https://hub.docker.com)|
|[MongoDB](https://www.mongodb.com) instance|[FluentBit](https://fluentbit.io)|
|[Node.js](https://nodejs.org/en)|[Linux](https://en.wikipedia.org/wiki/Linux_distribution)|
|[Pusher.com](https://pusher.com) account|[Nginx](https://www.nginx.com/)|
|[RabbitMQ](https://www.rabbitmq.com) instance|[Sentry.io](https://sentry.io) account|
|[Redis](https://redis.io) instance|[Timber.io](https://timber.io) account|
|RSA Key Pair||

## Automated Updates

An automated update is an unattended, server-side background process that selects an image from the user's Gravatar account and sets that image as the new Gravatar icon. The process behaves similar to an image carousel.

It is important to note that **`avatarbox.web`** does not perform any automated updates. This application simply provides an interface through which users can manage automated updates; automated updates themselves are delegated to [the cron job](https://bitbucket.org/mrtillman/avatarbox.workers/src/master/cron-job.js) which collaborates with [avatarbox.workers](https://bitbucket.org/mrtillman/avatarbox.workers).

## Authentication

When a website (such as Avatar Box) wants to use the services of another (such as updating your Gravatar icon), instead of asking you to provide your password, the website (Avatar Box) should actually use a protocol called [OAuth](https://en.wikipedia.org/wiki/OAuth) to facilitate [social login](https://en.wikipedia.org/wiki/Social_login). However, Avatar Box leverages the *Gravatar XML-RPC API*, which does not support OAuth:

> User authentication happens at the api method level. You will pass to the method call a password parameter. <br/> ~ [Gravatar XML-RPC API](https://en.gravatar.com/site/implement/xmlrpc)

So, in the absence of OAuth support, you will need to provide your Gravatar password, which Avatar Box will then [RSA Encrypt](https://simple.wikipedia.org/wiki/RSA_algorithm).

## Installation

```sh
$ npm install
```

## Launching the app

```bash
$ npm run start
```

## Tests

```bash
# unit tests
$ npm run test

# end-to-end tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# acceptance tests
$ npm run test:spec
```

## Usage

Open http://avatarbox:8801 to view it in the browser.

## License
[GPL-3.0](https://bitbucket.org/mrtillman/avatarbox.web/src/master/LICENSE.md)