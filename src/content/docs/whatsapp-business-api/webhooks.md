---
title: Incoming Webhooks
description: Webhooks Configuration of Whatsapp Business API
---

### Setting Up

For setting up webhooks, we require the **webhook verification token** and the **application secret key** that was provided from the Whatsapp Business Dashboard. For ensure security, it is signed using x-hub.

```js
// routes/incomingWebhook.js

const verificationToken = process.env.WEBHOOK_VERIFICATION_TOKEN;
const appSecret = process.env.APP_SECRET;
const xhub = new XHubSignature("SHA256", appSecret);
```

### Processing the message

A function like `processMessage` can be used to send messages according to their corresponding type.

```js
// incomingWebhook.js

async function processMessage(message) {
  const customerPhoneNumber = message.from;
  const messageType = message.type;

  if (messageType === "text") {
    const textMessage = message.text.body;
    console.log(textMessage);

    try {
      let replyButtonMessage = interactiveReplyButton;
      replyButtonMessage.to = process.env.RECIPIENT_PHONE_NUMBER;
      const replyButtonSent = await sendWhatsAppMessage(replyButtonMessage);
      console.log(replyButtonSent);
    } catch (error) {
      console.log(error);
    }
  } else if (messageType === "interactive") {
    const interactiveType = message.interactive.type;

    if (interactiveType === "button_reply") {
      const buttonId = message.interactive.button_reply.id;
      const buttonTitle = message.interactive.button_reply.title;

      if (buttonId == 1) {
        try {
          let productsList = interactiveList;
          productsList.to = process.env.RECIPIENT_PHONE_NUMBER;
          productsList.interactive.action.sections[0].rows =
            products.map(createProductsList);

          // List messages have a 10 item limit total
          productsList.interactive.action.sections[0].rows.length = 10;
          const sendProductLists = await sendWhatsAppMessage(productsList);
          console.log(sendProductLists);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (interactiveType === "list_reply") {
      const itemId = message.interactive.list_reply.id;
      const itemTitle = message.interactive.list_reply.title;
      const itemDescrption = message.interactive.list_reply.description;
    }
  }
}
```

### POST Endpoint for sending messages

The incoming request is checked for its x-hub signature, and checked for whether its coming from messages webhook. Verified messages are then, sent to user's Whatsapp Number.

```js
// incomingWebhook.js

router.post("/", async function (req, res, next) {
  // Calculate x-hub signature value to check with value in request header
  const calcXHubSignature = xhub.sign(req.rawBody).toLowerCase();

  if (req.headers["x-hub-signature-256"] != calcXHubSignature) {
    console.log(
      "Warning - request header X-Hub-Signature not present or invalid"
    );
    res.sendStatus(401);
    return;
  }

  console.log("request header X-Hub-Signature validated");

  const body = req.body.entry[0].changes[0];

  // Verify this is from the messages webhook, not other updates
  if (body.field !== "messages") {
    // not from the messages webhook so dont process
    return res.sendStatus(400);
  }

  if (body.value.hasOwnProperty("messages")) {
    // Mark an incoming message as read
    try {
      let sendReadStatus = messageStatuses.read;
      sendReadStatus.message_id = body.value.messages[0].id;
      const readSent = await sendWhatsAppMessage(sendReadStatus);
      console.log(readSent);
    } catch (error) {
      console.log(error);
    }

    body.value.messages.forEach(processMessage);
  }

  res.sendStatus(200);
});
```
