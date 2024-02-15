import fs from 'node:fs/promises';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';
import sirv from 'sirv';

const isPrd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const { log } = console;

async function createServer() {
	const httpServer = express();
	const viteServer = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom',
		base,
	});

	if (!isPrd) {
		httpServer.use(viteServer.middlewares);
	} else {
		httpServer.use(compression());
		httpServer.use(base, sirv('./dist/client', { extensions: [] }));
	}

	httpServer.use('*', async (req, res) => {
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

	httpServer.listen(port, () => {
		log(`Server started at http://localhost:${port}`);
	});
}

createServer();
