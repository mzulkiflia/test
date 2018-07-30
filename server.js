const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "h8E6vA/OvSnqaXcGWOSZIO2/iczjRmtwi8dpTP271gByP6KiP5mZj5q61Hxv/3YGy8ylsv/Gz2ztcxxnmM/5tALgFTXzGOZQ11EeMgJ5Ekmf7bNLIHz/ah202d7nKLbi4N8NGitCkFFFP0TndjY7DgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "f482378cd0b685058a82353940ddf032",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "halo! silahkan ketikkan /menu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});