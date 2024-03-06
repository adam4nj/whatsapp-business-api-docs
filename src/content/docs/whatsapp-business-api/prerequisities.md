---
title: Prerequisities
description: Requirements for start developing using the Whatsapp Business API
---

### Requirements

- [A Meta developer account](https://developers.facebook.com/async/registration).
- [A Meta Business app](https://business.facebook.com/).

### Configuring Whatsapp Business API

We can add products to the Meta Business app, for instance, here, being Whatsapp.
After adding Whatsapp, it results in generating:

- A test Whatsapp Business Account
- A test business phone number (can be used to message to 5 recipients)
- Set of previously available message templates

**Add Recipient Phone Number :** You can add any valid WhatsApp number as a recipient. The recipient number will receive a confirmation code in WhatsApp that can be used to verify the number.

**Send a Test Message :** A pre-approved hello_world template message can be sent to your chosen recipient number , where (”type”:”template”) and identifying a specific template to use, such as (”name”:”hello_world”) using cURL.

**Clone Our Sample App and Configure Webhooks :** With webhooks, you can receive real-time HTTP notifications of changes to specific objects. In WhatsApp, webhooks can notify you of many events in your app, like message delivery and read notifications, and even account changes.

**Setup a callback URL :** Add a callback URL in order to see the contents of webhooks.
