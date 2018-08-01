const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "h8E6vA/OvSnqaXcGWOSZIO2/iczjRmtwi8dpTP271gByP6KiP5mZj5q61Hxv/3YGy8ylsv/Gz2ztcxxnmM/5tALgFTXzGOZQ11EeMgJ5Ekmf7bNLIHz/ah202d7nKLbi4N8NGitCkFFFP0TndjY7DgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "66ea46a74c8592d2d6aeba1ec445838e",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
});

function handleEvent(event) {
    if(event.message.text === "hai"){
      const echo = { type: 'text', text: "Selamat Datang di Official Line Tabook Indonesia!" };
      return client.replyMessage(event.replyToken, echo);
    }
    if(event.message.text === "/menu"){
      const echo = { type: 'text', text: "Silahkan ketikkan menu di bawah ini: \n\n- /book  = untuk memesan travel anda\n\n- /event = untuk mengetahui info-info menarik dari Tabook \n\n- /about = untuk penjelesan lebih lanjut mengenai tabook \n\n\n atau dengan memilih menu yang ada di kiri chatbox" };
      return client.replyMessage(event.replyToken, echo);
    }
    if(event.message.text === "/book"){
      const echo =  {  
      "type": "flex",
      "altText": "Silahkan pilih menu.",
      "contents": {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "hero": {
        "type": "image",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "url": "https://www.iconspng.com/images/travel-car/travel-car.jpg"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": "Malang - Juanda",
            "wrap": true,
            "weight": "bold",
            "size": "lg"
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": "Rp. 79.000,-",
                "wrap": true,
                "weight": "bold",
                "size": "md",
                "flex": 0
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "message",
              "label": "Pilih",
              "text": "/malang-juanda"
            }
          }
        ]
      }
    },
    {
      "type": "bubble",
      "hero": {
        "type": "image",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "url": "https://www.freeiconspng.com/uploads/airplane-png-15.png"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": "Juanda - Malang",
            "wrap": true,
            "weight": "bold",
            "size": "lg"
          },
          {
            "type": "box",
            "layout": "baseline",
            "flex": 1,
            "contents": [
              {
                "type": "text",
                "text": "Rp. 84.000,-",
                "wrap": true,
                "weight": "bold",
                "size": "md",
                "flex": 0
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "flex": 2,
            "style": "primary",
            "action": {
              "type": "message",
              "label": "Pilih",
              "text": "/juanda-malang"
            }
          }
        ]
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "flex": 1,
            "gravity": "center",
            "action": {
              "type": "uri",
              "label": "See more on our website",
              "uri": "https://tabook.id"
            }
          }
        ]
      }
    }
  ]
}
    }
      return client.replyMessage(event.replyToken, echo);
    }
    const echo = { type: 'text', text: "Keyword Salah. Silahkan ketikkan /menu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});