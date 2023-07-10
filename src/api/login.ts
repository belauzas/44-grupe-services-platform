import { file } from "../lib/file.js";
import { APIresponse } from "../lib/server.js";

export async function loginAPI(httpMethod: string, restUrlParts: string[], jsonData: any): Promise<APIresponse> {
    const availableHttpMethods = ['post'];
    if (availableHttpMethods.includes(httpMethod) && httpMethod in api) {
        return await api[httpMethod]!(restUrlParts, jsonData);
    }

    return {
        statusCode: 405,
        headers: {},
        body: `"${httpMethod}" HTTP method is not allowed.`,
    };
}

const api: Record<string, Function> = {};

api.post = async (restUrlParts: string[], jsonData: any): Promise<APIresponse> => {
    if (typeof jsonData.email !== 'string' || jsonData.email === '') {
        return {
            statusCode: 422,
            headers: {},
            body: `Email has to be non-empty text.`,
        };
    }

    if (typeof jsonData.pass !== 'string' || jsonData.pass === '') {
        return {
            statusCode: 422,
            headers: {},
            body: 'Password has to be non-empty text.',
        };
    }

    const keys = Object.keys(jsonData);
    if (keys.length > 2) {
        return {
            statusCode: 422,
            headers: {},
            body: 'Login object has to be with keys: "username", "email" and "pass" only.',
        };
    }

    const [userErr, userMsg] = await file.read('users', jsonData.email + '.json');
    if (userErr) {
        return {
            statusCode: 422,
            headers: {},
            body: 'Incorrect email and/or password.',
        };
    }

    const userObj = JSON.parse(userMsg);
    if (userObj.pass !== jsonData.pass) {
        return {
            statusCode: 422,
            headers: {},
            body: 'Incorrect email and/or password.',
        };
    }

    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
        const index = Math.floor(Math.random() * abc.length);
        token += abc[index];
    }

    const tokenObj = {
        email: jsonData.email,
        createdAt: new Date().getTime(),
    };
    const [tokenErr, tokenMsg] = await file.create('token', token + '.json', tokenObj);
    if (tokenErr) {
        return {
            statusCode: 500,
            headers: {},
            body: 'Server problem... Please, try again...',
        };
    }

    const timeToDeletion = 3600;
    const cookieString = [
        `session-token=${token}`,
        'HttpOnly',
        'Max-Age=' + timeToDeletion,
        'Path=/',
        // 'Secure',
        'SameSite=Strict',
    ];

    return {
        statusCode: 201,
        headers: {
            'Set-Cookie': cookieString.join('; '),
        },
        body: 'User session created.',
    };
}
