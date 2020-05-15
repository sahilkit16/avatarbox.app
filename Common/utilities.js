require('dotenv').config();
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_SOURCE });

function rotateLeft(collection, _targetIndex) {
  const targetIndex = _targetIndex % collection.length;
  if (targetIndex == 0) {
    return collection;
  }
  const begin = [];
  const end = [];
  collection.map((item, index) => {
    if (index >= targetIndex) {
      begin.push(item);
    } else {
      end.push(item);
    }
  });
  return [...begin, ...end];
}

module.exports = {
  rotateLeft,
  Sentry
};
