---
title: Configuration
description: Intial Setup inorder to use Whatsapp Business API
---

### Software Requirements

**Technologies Used**: Node.js, Express.js

The following npm packages have to be installed:

- **express**
- **ejs**
- **axios**
- **dotenv**
- **body-parser**

### Environmental Variables

Your node application should contain the following variables in the .env file.

```
APP_ID=<<your WhatsApp business app id>>
APP_SECRET=<<your WhatsApp business app secret>>
RECIPIENT_WAID=<<your recipient test phone number>>
PHONE_NUMBER_ID=<<sender test phone number id>>
BUSINESS_ACCOUNT_ID=<<WhatsApp business account id>>
ACCESS_TOKEN=<<access token you generated for your System User>>
TEMPLATE_NAME_PREFIX=mkt

```

### Verifying the application

For a verification request in webhooks, the application checks for whether the `hub.mode === 'subscribe'` and `hub.verify_token === "token_provided_by_user"`, and returns the `hub.challenge` parameter, which the verification system sends as a request parameter.

```js
// routes/incomingWebhook.js

router.get("/", function (req, res, next) {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == verificationToken
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
});
```
