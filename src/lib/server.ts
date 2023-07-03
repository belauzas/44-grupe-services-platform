import http, { IncomingMessage, ServerResponse } from 'node:http';
import { StringDecoder } from 'node:string_decoder';
import { file } from './file.js';

import { PageHome } from '../pages/PageHome.js';
import PageRegister from '../pages/PageRegister.js';
import Page404 from '../pages/Page404.js';

export const serverLogic = async (req: IncomingMessage, res: ServerResponse) => {
    const baseUrl = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url ?? '', baseUrl);
    const trimmedPath = parsedUrl.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/+/g, '/');

    const textFileExtensions = ['css', 'js', 'webmanifest', 'svg'];
    const binaryFileExtensions = ['png', 'jpg', 'ico'];
    const extension = (trimmedPath.includes('.') ? trimmedPath.split('.').at(-1) : '') as string;

    const isTextFile = textFileExtensions.includes(extension);
    const isBinaryFile = binaryFileExtensions.includes(extension);
    const isAPI = trimmedPath.startsWith('api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    type Mimes = Record<string, string>;
    const MIMES: Mimes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        json: 'application/json',
        txt: 'text/plain',
        svg: 'image/svg+xml',
        xml: 'application/xml',
        ico: 'image/vnd.microsoft.icon',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        webmanifest: 'application/manifest+json',
    };

    let responseContent: string | Buffer = '';
    let buffer = '';
    const stringDecoder = new StringDecoder('utf-8');

    req.on('data', (data) => {
        buffer += stringDecoder.write(data);
    });

    req.on('end', async () => {
        buffer += stringDecoder.end();

        if (isTextFile) {
            const [err, msg] = await file.readPublic(trimmedPath);

            if (err) {
                res.statusCode = 404;
                responseContent = `Error: could not find file: ${trimmedPath}`;
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[extension],
                })
                responseContent = msg;
            }
        }

        if (isBinaryFile) {
            const [err, msg] = await file.readPublicBinary(trimmedPath);

            if (err) {
                res.statusCode = 404;
                responseContent = `Error: could not find file: ${trimmedPath}`;
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[extension],
                })
                responseContent = msg;
            }
        }

        if (isAPI) {
            const jsonData = buffer ? JSON.parse(buffer) : {};

            const [err, msg] = await file.create('users', jsonData.email + '.json', jsonData);

            if (err) {
                responseContent = msg.toString();
            } else {
                responseContent = 'User created!';
            }
        }

        if (isPage) {
            res.writeHead(200, {
                'Content-Type': MIMES.html,
            });

            const PageClass = pages[trimmedPath] ? pages[trimmedPath] : pages['404'];
            responseContent = new PageClass().render();
        }

        res.end(responseContent);
    });
};

export const pages: Record<string, any> = {
    '': PageHome,
    'register': PageRegister,
    '404': Page404,
};

export const httpServer = http.createServer(serverLogic);

export const init = () => {
    httpServer.listen(4415, () => {
        console.log(`Server running at http://localhost:4415`);
    })
};

export const server = {
    init,
    httpServer,
    pages,
};

export default server;