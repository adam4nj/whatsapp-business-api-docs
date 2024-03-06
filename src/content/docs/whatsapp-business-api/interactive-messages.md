---
title: Interactive Messages
description: How to use Interactive messages in Whatsapp Business API
---

Interactive messages are provided with the type `'interactive'`

## Interactive List

For a interactive list, inside interactive option choose type `'list'`.

```js
// public/javascripts/interactiveList.js

const list = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "PHONE_NUMBER",
  type: "interactive",
  interactive: {
    type: "list",
    header: {
      type: "text",
      text: "Add to Item to Existing Pending Order",
    },
    body: {
      text: "View our list of produce to add to your existing order. Hurry before your order is out for delivery!",
    },
    footer: {
      text: "Markt online groceries",
    },
    action: {
      button: "Products List",
      sections: [
        {
          title: "Fresh Produce",
          rows: [
            {
              id: "SECTION_1_ROW_1_ID",
              title: "SECTION_1_ROW_1_TITLE",
              description: "SECTION_1_ROW_1_DESCRIPTION",
            },
            {
              id: "SECTION_1_ROW_2_ID",
              title: "SECTION_1_ROW_2_TITLE",
              description: "SECTION_1_ROW_2_DESCRIPTION",
            },
          ],
        },
        {
          title: "Fresh Produce Cont",
          rows: [],
        },
      ],
    },
  },
};
```

The message can contain

- `header`,
- `body` and
- `footer`

  fields, which can contain `type` and `text` etc.

- `action` can include buttons which produces the resultant list of sections, which contains

  - `title` of the section
  - `rows` of the section

  **rows** are of the type:

  ```js

    {
        "id": string,
        "title": string,
        "description": string
    }

  ```

## Interactive Button

Interactive reply button uses the type `button`, which a `body` can be used to provide the message, in the `action` field, replies can be collected using Yes/No buttons.

```js
// public/javascripts/interactiveReplyButton.js

const replyButton = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "PHONE_NUMBER",
  type: "interactive",
  interactive: {
    type: "button",
    body: {
      text: "Do you want to add an item to your order?",
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "0",
            title: "No",
          },
        },
        {
          type: "reply",
          reply: {
            id: "1",
            title: "Yes",
          },
        },
      ],
    },
  },
};
```
