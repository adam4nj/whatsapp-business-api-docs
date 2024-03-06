---
title: Message Templates
description: Explanation of message templates, their purpose, and how to create them.
---

We should create a file called `createTemplates.js` in the **/routes** folder which takes the local message template and checks whether it is a pre-existing/approved template. Then, a new message template is created. If it already exists in the remote, only a warning is raised without creating a template.

```js
//  routes/createTemplates.js

router.use(bodyParser.json());

router.post('/', async function (req, res, next) {

  try {
      const templatesResponse = await listTemplates()
      const remoteApprovedTemplates =
        templatesResponse.data.data.filter(t => t.status === 'APPROVED');

      const localTemplates = messageTemplates

      for (let index = 0; index < localTemplates.length; index++) {
        const localTemplate = localTemplates[index];

        const queryResult = remoteApprovedTemplates
        .filter(t => t.name == process.env.TEMPLATE_NAME_PREFIX
          + '_' + localTemplate.name)

        console.log(`Creating template: ${localTemplate.name}.`)

        if (queryResult.length > 0) {
          console.log(`Template ${queryResult[0].name} already exists.`)
          continue;
        }

        try {
          await createMessageTemplate(localTemplate);
          console.log(`Template ${localTemplate.name} created successfully.`)
        } catch (error) {
          console.log(`Failed creating template ${localTemplate.name}.`)
          console.log(error.response.data);
        }

      }
    } catch (error) {
      console.log(“Failed obtaining remote template list.”)
      console.log(error);
    }
});


```

The respective helper functions are given by the below code snippets.

```js
// messageHelper.js

const axios = require("axios");

async function listTemplates() {
  return await axios({
    method: "get",
    url:
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates` +
      "?limit=1000" +
      `&access_token=${process.env.ACCESS_TOKEN}`,
  });
}

async function createMessageTemplate(template) {
  const config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: {
      name: process.env.TEMPLATE_NAME_PREFIX + "_" + template.name,
      category: "TRANSACTIONAL",
      components: template.components,
      language: template.language,
    },
  };

  return await axios(config);
}
```

Here `listTemplates()` shows a simple GET request for the available message templates for your account and `createMessageTemplate(template)` is used for a POST request for producing a new message template with `template`.

Modify the app.js file to create a router variable for the /createTemplate route:

`const createTemplatesRouter = require('./routes/createTemplates');`

Then, allow the app to use the new createTemplatesRouter variable:

`app.use('/createTemplates', createTemplatesRouter);`
