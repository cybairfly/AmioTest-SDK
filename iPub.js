// const api = require('./~callback/api');
// const api = require('./~promise/api');
const api = require('./api');
const msg = require('./msg');
const ip = require('public-ip');

const channel = 151679056510772;
const contact = 1803539683052785;

const message = msg.Message(channel, contact);

const interval = setInterval(() => {
    ip.v4()
        .then(ip => {
                api.postMessages(channel, message, ip);
        })
        .catch (e => console.log(e));
}, 7200000);