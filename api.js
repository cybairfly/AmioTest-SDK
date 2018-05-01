const cfg = require('./cfg');
const axios = require('axios');
const ip = require('public-ip');

const logSyntax = () => console.log(`\nAsync/await:\n`);

const getStatus = (channel) => {
  const config = cfg.getConfig(`channels/${channel}`, 'get');
  return axios(config);
}

const getContacts = (channel) => {
  const config = cfg.getConfig(`channels/${channel}/contacts`, 'get');
  return axios(config);
}

const postMessage = (id, message, payload) => {
  // console.log(id);
  // console.log(message);

  const date = new Date(Date());
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  const time = `Ahoj ${hours}:${minutes}:${seconds}`;

  message.contact.id = `${id}`;
  message.content.payload = payload ? payload : time;

  const config = cfg.getConfig(`messages`, 'post');
  config.data = JSON.stringify(message, null, 2);
  // console.log(config.data);
  return axios(config);
}

const messageAll = async (ids, message, payload) => {
  try {
    let messages = await Promise.all(ids.map(id => postMessage(id, message, payload)));
  }
  catch (e) {
    console.log(e);
  }
  console.log(messages.map(message => message.data));
}

const notify = (notification) => {
  const config = cfg.getConfig(`notifications`, 'post');
  config.data = JSON.stringify(notification);
  return axios(config);
}

const logStatus = async channel => {
  try {
    const status = await getStatus(channel);
    console.log(status.data);
  }
  catch (e) {
    console.log(e);
  }
}

const postMessages = async (channel, message, payload) => {
  try {
    const contacts = await getContacts(channel);
  }
  catch (e) {
    console.log(e);
  }
    //let ids = contacts.data.map(contact => contact.id);
    let ids = ['1803539683052785'];
    messageAll(ids, message, payload);
}

module.exports = {
  logSyntax,
  getStatus,
  getContacts,
  postMessage,
  messageAll,
  logStatus,
  postMessages
}
