import { file } from "../lib/file.js";
import { APIresponse } from "../lib/server.js";

export async function registerAPI(httpMethod: string, restUrlParts: string[], jsonData: any): Promise<APIresponse> {
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

    if (typeof jsonData.username !== 'string' || jsonData.username === '') {
        return {
            statusCode: 422,
            headers: {},
            body: 'Username has to be non-empty text.',
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
    if (keys.length > 3) {
        return {
            statusCode: 422,
            headers: {},
            body: 'Registration object has to be with keys: "username", "email" and "pass" only.',
        };
    }

    const [userErr, userMsg] = await file.create('users', jsonData.email + '.json', jsonData);
    if (userErr) {
        return {
            statusCode: 409,
            headers: {},
            body: 'User with this email is already registered.',
        };
    }

    return {
        statusCode: 201,
        headers: {},
        body: 'User created.',
    };
}
