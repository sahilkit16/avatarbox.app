# avatarbox.app

app server for [avatarbox.io](https://avatarbox.io)

---

<!--
[![Build Status](https://travis-ci.com/mrtillman/avatarbox.sdk.svg?branch=master)](https://travis-ci.com/mrtillman/avatarbox.sdk)
[![Coverage Status](https://coveralls.io/repos/github/mrtillman/avatarbox.sdk/badge.svg?branch=master)](https://coveralls.io/github/mrtillman/avatarbox.sdk?branch=master)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/mrtillman/avatarbox.sdk?sort=semver)](https://github.com/mrtillman/avatarbox.sdk/releases/tag/1.0.0)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mrtillman/avatarbox.sdk/blob/master/LICENSE)
-->

## Getting Started

**`avatarbox.app`** is a [Next.js](https://nextjs.org) application that allows users to manage automated updates for their Gravatar or Twitter profile icon.

## Checklist

- IAM Role: `AvbxAppServer`
  - AmazonDynamoDBFullAccess
  - AmazonS3FullAccess
  - AmazonSQSFullAccess
- KMS Symmetric Key
  - add `AvbxAppServer` as a Key user

Next, find [demo.env](https://github.com/mrtillman/avatarbox.app/blob/master/demo.env), rename it to `.env` and modify:

```sh
DEV_ENV=1
PUSHER_KEY=11111112222222333333
PUSHER_CLUSTER=xx1
REDIS_URI=redis://localhost:6379
SENTRY_DSN=https://000@111.ingest.sentry.io/222
SESSION_KEY=a rolling stone gathers no moss

# for the avatarbox.sdk dependency
KMS_KEY_ID={YOUR-KMS-KEY-ID}
REGION=us-east-1
QUEUE_URL={YOUR-SQS-QUEUE-URL}
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=mrtillman
MYSQL_PASSWORD=letmein
MYSQL_DATABASE=gravatar
SALT={BCRYPT-SALT}
```

Also find [demo.next.config.js](https://github.com/mrtillman/avatarbox.app/blob/master/demo.next.config.js), rename it to `next.config.js` and modify:


```js
module.exports = {
  env: {
    'DEV_ENV': true,
    'PUSHER_KEY': '11111112222222333333',
    'PUSHER_CLUSTER': 'xx1',
    'REDIS_URI': 'redis://localhost:6379',
    'SENTRY_DSN': 'https://000@111.ingest.sentry.io/222',
    'SESSION_KEY': 'a rolling stone gathers no moss',
  }
}
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

Open http://localhost:8080 to view it in the browser.

![avbx-demo](https://d2bi7agqetsdur.cloudfront.net/avbx-demo.gif)

## License
[MIT](https://github.com/mrtillman/avatarbox.app/blob/main/LICENSE)
