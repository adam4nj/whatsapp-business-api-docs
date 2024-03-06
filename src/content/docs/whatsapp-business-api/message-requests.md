---
title: Message Requests
description: HTTP Requests made towards Meta's Graph API
---

- Helper functions which includes Graph API calls for sending and updating the Whatsapp messages.

- Should access `ACCESS_TOKEN`, `VERSION`, `RECIPIENT_PHONE_NUMBER`, `PHONE_NUMBER_ID`, `BUSINESS_ACCOUNT_ID` environmental variables.

```js
// messageHelper.js

async function sendWhatsAppMessage(data) {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

async function updateWhatsAppMessage(data) {
  const config = {
    method: "put",
    url: `https://graph.facebook.com/${apiVersion}/${myNumberId}/messages`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}
```
