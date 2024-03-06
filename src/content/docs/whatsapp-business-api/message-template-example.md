---
title: Message Template Examples
description: Samples for creating message templates
---

## Structure

In the above example, the keys can be given as follows:

- `name` - Name of the template (Maximum 512 characters)
- `category` - Category of the message template.`'TRANSACTIONAL' | 'AUTHENTICATION' | 'MARKETING' | 'UTILITY'`
- `language` - Template language and locale code.
- `components` - Components which make up the template.
- `modelFields` - Dynamic values that can be passes into the template body. Each element can be accessed with their index. Eg: `[ 'firstName', 'orderNumber', 'deadlineDays' ]` can be accessed as
  with their indices `{{1}}`,`{{2}}` and `{{3}}` respectively.

```js
// public/javascripts/messageTemplate.js
const messageTemplates = [
  {
    name: "order_delivered",
    category: "TRANSACTIONAL",
    components: [
      {
        type: "BODY",
        text:
          "Hello {{1}}, order {{2}} has been delivered!" +
          "\n" +
          "\nEnjoy it! 🎉" +
          "\n" +
          "\nIf you have any problems and want to exchange or return, the deadline is {{3}} calendar days. To order, just enter the My Account section of the website or app, find the product(s) in My Orders and click on exchange or return. We only do not exchange if there are signs that the product has been used, such as damaged labels and broken seals, ok?" +
          "\n" +
          "\nThanks for shopping with us!" +
          "\n" +
          "\nSee you later 👋",
        example: { body_text: [["Bob", "02-950515063", "7"]] },
      },
    ],
    language: "en_US",
    modelFields: ["firstName", "orderNumber", "deadlineDays"],
  },
];
```

Inside each component, the given fields are:

- `type` - The type of message being passed. `'HEADERS' | 'BODY' | 'FOOTER' | 'BUTTONS'`
- The next field can be derived from the type provided previously. So it can be `text`,`url`,`phone_number` etc.

  In text based components, modelFields can be interpolated along the original text with syntax `{{i}}`, where i can be the index of the item in `modelFields`.

- `example` - Here the values for the modelFields can be provided through `[["value"]]` by the key such as `body_text` as given here.

More about Messsage Templates and their different categories can be found [here](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#template-categories) from Meta's documentation.
