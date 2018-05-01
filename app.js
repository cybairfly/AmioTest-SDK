// const api = require('./~callback/api');
// const api = require('./~promise/api');
const api = require('./api');
const msg = require('./msg');

const channel = 151679056510772;
const contact = 1803539683052785;

// const payload = 'test';
const payload = {
  "text": "Dobry den, dnes sme sa Vam neuspesne pokusili dorucit zasielku ${tracking_number} od ${sender}. Miesto alebo datum dorucenia mozete zmenit pouzitim odkazu ${url} do 21.hod. Zadane zmeny budu aplikovane nasledujuci pracovny den. V opacnom pripade bude zasielka opatovne dorucovana na povodnu adresu. Dakujeme. Neodpovedajte na tuto SMS",
  "buttons": [
    {
      "type": "url",
      "title": "Zmenit doruceni",
      "payload": "https://amio.io"
    }
  ]
};

const message = msg.Message(channel, contact);
const messageStructure = msg.MessageStructure(channel, contact);
const notification = msg.Notify(channel, contact);

api.logSyntax();
// api.logStatus(channel);
api.postMessages(channel, message, payload);

                                                                  //Multisender
/*
let counter = 0;

function tick() {
  if (counter < 10) {
    api.postMessage(contact, message)
    .then(data => {
        console.log(counter);
        console.log(data.data);
        setTimeout(tick, 1000);
        counter++;
    })
    .catch((e) => console.log(e));
  }
}

tick();
*/
