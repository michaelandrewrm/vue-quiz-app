/* eslint-disable no-undef */
import fs from 'node:fs/promises';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import sirv from 'sirv';
import cors from 'cors';
import createDataBase from './db/index.js';
import controller from './db/controller.js';

const isPrd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const { log } = console;

async function createServer() {
	const app = express();
	const viteServer = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom',
		base,
	});
	const sequelize = await createDataBase();

	app.use(express.json());
	app.use(cors({ origin: '*' }));

	app.get('/api/*', async (req, res) => {
		const normalizeName = (url) => {
			const name = url.replace('/api/', '');

			return name.charAt(0).toUpperCase() + name.slice(1);
		};
		const name = normalizeName(req.originalUrl);

		if (['Users', 'Questions'].includes(name)) {
			const response = await controller.get(name, sequelize);

			res.status(200).set('Content-Type', 'application/json').send(response);
		}
	});

	app.post('/api/users', async (req, res) => {
		const payload = req.body;
		const user = await controller.create('Users', sequelize, payload);

		if (user.id) {
			const response = user.toJSON();
			res.status(200).set('Content-Type', 'application/json').send(response);
		} else {
			res.status(400).send();
		}
	});

	app.post('/api/questions', async (req, res) => {
		const payload = req.body;

		if (payload?.userId && payload?.answers?.length) {
			const response = await controller.getScore(payload, sequelize);

			if (response) {
				res.status(200).set('Content-Type', 'application/json').json(response);
			}
		}

		res.status(400).send();
	});

	if (!isPrd) {
		app.use(viteServer.middlewares);
	} else {
		app.use(compression());
		app.use(base, sirv('./dist/client', { extensions: [] }));
	}

	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl.replace(base, '');
			let template;
			let render;

			if (!isPrd) {
				template = await fs.readFile('./index.html', 'utf-8');
				template = await viteServer.transformIndexHtml(url, template);
				render = (await viteServer.ssrLoadModule('/src/entry-server.js')).render;
			} else {
				template = await fs.readFile('./dist/client/index.html', 'utf-8');
				render = (await import('../dist/server/entry-server.js')).render;
			}

			const ssrManifest = isPrd
				? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
				: undefined;
			const rendered = await render(url, ssrManifest);
			const html = template
				.replace(`<!--app-head-->`, rendered.head ?? '')
				.replace(`<!--app-html-->`, rendered.html ?? '');

			res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
		} catch (err) {
			viteServer?.ssrFixStacktrace(err);
			log(err.stack);
			res.status(500).end(err.stack);
		}
	});

	app.listen(port, () => {
		log(`Server started at http://localhost:${port}`);
	});
}

createServer();
