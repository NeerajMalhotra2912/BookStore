/* eslint-disable new-cap */
/* eslint-disable indent */
require('dotenv').config();

('use strict');

const DEBUG_CONNECTING = 'Connecting to db server %s...';
const DEBUG_ALREADY_CONNECTED = 'Already connected to db server %s.';
const DEBUG_ALREADY_CONNECTING = 'Already connecting to db server %s.';
const DEBUG_CONNECTED = 'Successfully connected to db server %s.';
const DEBUG_CONNECTION_ERROR = 'An error has occured while connecting to db server %s.';
const DEBUG_DISCONNECTING = 'Disconnecting from db server %s...';
const DEBUG_ALREADY_DISCONNECTED = 'Already disconnected from db server %s.';
const DEBUG_ALREADY_DISCONNECTING = 'Already disconnecting from db server %s.';
const DEBUG_DISCONNECTED = 'Successfully disconnected from db server %s.';
const DEBUG_DISCONNECTION_ERROR = 'An error has occured while disconnecting from db server %s.';

const blueBird = require('bluebird');
const mongoose = require('mongoose');

const isState = function (state) {
  return mongoose.connection.readyState === mongoose.Connection.STATES[state];
};

/**
* @constructor
*
* @param {string} uri     - Mongoose connection URI.
* @see http://mongoosejs.com/docs/connections.html
* @param {object} options - Mongoose connection options.
*
*/
function MongoDBAdapter(uri, options) {
  this.uri = uri;
  this.options = options;
}
/**
* @description Add connection listeners without adding more than one for each event.
* This is done to avoid:
*   'warning: possible EventEmitter memory leak detected. 11 listeners added'
* More info: https://github.com/joyent/node/issues/5108
*/

MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
  const listeners = mongoose.connection._events;
  if (!listeners || !listeners[event] || listeners[event].length === 0) {
    mongoose.connection.once(event, cb.bind(this));
  }
};

/**
* @description : Returns a promise that gets resolved when successfully connected to
*                MongoDB URI, or rejected otherwise.
* @returns {Promise} Returns promise
*/

MongoDBAdapter.prototype.connect = function () {
  return new blueBird((resolve, reject) => {
    if (isState('connected')) {
      console.log(DEBUG_ALREADY_CONNECTED, this.uri);
      return resolve(this.uri);
    }

    this.addConnectionListener('error', function (err) {
      console.log(DEBUG_CONNECTION_ERROR, this.uri);
      return reject(err);
    });

    this.addConnectionListener('open', function () {
      console.log(DEBUG_CONNECTED, this.uri);
      return resolve(this.uri);
    });

    if (isState('connecting')) {
      console.log(DEBUG_ALREADY_CONNECTING, this.uri);
    } else {
      console.log(DEBUG_CONNECTING, this.uri);
      mongoose.connect(this.uri, this.options);
    }
  });
};

/**
* @description : Returns a promise that gets resolved when successfully disconnected
*                from MongoDB URI, or rejected otherwise.
* @return {Promise} Bluebird promise
*/
MongoDBAdapter.prototype.disconnect = function () {
  return new blueBird((resolve, reject) => {
    if (isState('disconnected') || isState('uninitialized')) {
      console.log(DEBUG_ALREADY_DISCONNECTED, this.uri);
      return resolve(this.uri);
    }

    this.addConnectionListener('error', function (err) {
      console.log(DEBUG_DISCONNECTION_ERROR, this.uri);
      return reject(err);
    });

    this.addConnectionListener('disconnected', function () {
      console.log(DEBUG_DISCONNECTED, this.uri);
      return resolve(this.uri);
    });

    if (isState('disconnecting')) {
      console.log(DEBUG_ALREADY_DISCONNECTING, this.uri);
    } else {
      console.log(DEBUG_DISCONNECTING, this.uri);
      mongoose.disconnect();
    }
  });
};

const db = new MongoDBAdapter(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// console.log(db);
db
  .connect()
  .then((uri) => {
    console.log(uri);
    console.log(`Connected to ${uri}`);
  })
  .catch((uri) => {
    db.disconnect();
    console.log(`Disconnected from ${uri}`);
  });
module.exports = MongoDBAdapter;
