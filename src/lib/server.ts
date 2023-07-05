import http, { IncomingMessage, ServerResponse } from 'node:http';
import { StringDecoder } from 'node:string_decoder';
import { file } from './file.js';

// PAGES
import { PageHome } from '../pages/PageHome.js';
import { Page404 } from '../pages/Page404.js';
import { PageRegister } from '../pages/PageRegister.js';
import { PageServices } from '../pages/PageServices.js';
import { PageLogin } from '../pages/PageLogin.js';
import { PageAccount } from '../pages/PageAccount.js';

// API
import { registerAPI } from '../api/register.js';
import { loginAPI } from '../api/login.js';

const serverLogic = async (req: IncomingMessage, res: ServerResponse) => {
    // Susitvarkome URL
    const baseUrl = `http://${req.headers.host}`;
    const parsedUrl = new URL(req.url ?? '', baseUrl);
    const httpMethod = req.method?.toLowerCase() ?? 'get';
    const trimmedPath = parsedUrl.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/+/g, '/');

    // Kokio resurso nori klientas?
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

    // Upload? API POST request?
    req.on('data', (data) => {
        buffer += stringDecoder.write(data);
    });

    // Galutinis sprendimas ir atsakymas klientui
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
            res.writeHead(200, {
                'Content-Type': MIMES.json,
            });

            let jsonData = {};
            try {
                jsonData = JSON.parse(buffer);
            } catch (error) { }

            const [_, endpoint, ...restUrlParts] = trimmedPath.split('/') as [string, string, string[]];
            const apiFunction = apiEndpoints[endpoint];
            if (apiFunction) {
                responseContent = await apiFunction(httpMethod, restUrlParts, jsonData);
            } else {
                responseContent = 'TOKS API ENDPOINTAS NEEGZISTUOJA!!!';
            }

            responseContent = JSON.stringify(responseContent);
        }

        if (isPage) {
            res.writeHead(200, {
                'Content-Type': MIMES.html,
            });

            const isLoggedIn = true;
            let PageClass = publicPages['404'];

            if (isLoggedIn && trimmedPath in protectedPages) {
                PageClass = protectedPages[trimmedPath];
            }

            if (trimmedPath in publicPages) {
                PageClass = publicPages[trimmedPath]
            }

            responseContent = new PageClass().render();
        }

        res.end(responseContent);
    });
};

export const publicPages: Record<string, any> = {
    '': PageHome,
    'services': PageServices,
    'register': PageRegister,
    'login': PageLogin,
    '404': Page404,
};

export const protectedPages: Record<string, any> = {
    'account': PageAccount,
};

export const apiEndpoints: Record<string, any> = {
    'register': registerAPI,
    'login': loginAPI,
};

const httpServer = http.createServer(serverLogic);

export const init = () => {
    httpServer.listen(4415, () => {
        console.log(`Server running at http://localhost:4415`);
    })
};

export const server = {
    init,
    httpServer,
    pages: publicPages,
};

export default server;