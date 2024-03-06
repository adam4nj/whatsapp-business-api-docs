import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Bytestrone Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'About',
					items: [
						
						{ label: 'Purpose', link: '/about/purpose/' },
						{ label: 'Overview', link: '/about/brief-overview/'},
						{ label: 'Target Audience', link: '/about/audience/'},

					]

				},
				{
					label: 'Whatsapp Business API',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Prerequisities', link: '/whatsapp-business-api/prerequisities/' },
						{ label: 'Initial Configuration', link:'/whatsapp-business-api/configuration/'},
						{ label: 'Message Templates', link: '/whatsapp-business-api/message-template/'},
						{ label: 'Templates Example', link: '/whatsapp-business-api/message-template-example/'},
						{ label: 'Interactive Messages', link: '/whatsapp-business-api/interactive-messages/'},
						{ label: 'Webhooks', link: '/whatsapp-business-api/webhooks/'},
						{ label: 'Message Requests', link: '/whatsapp-business-api/message-requests/'},
						{ label: 'Configuring Routes', link: '/whatsapp-business-api/routes/'}
					],
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
