import { file } from "../lib/file.js";

export async function registerAPI(httpMethod: string, restUrlParts: string[], jsonData: any): Promise<string> {
    const availableHttpMethods = ['post'];
    if (availableHttpMethods.includes(httpMethod) && httpMethod in api) {
        return await api[httpMethod]!(restUrlParts, jsonData);
    }

    return `"${httpMethod}" HTTP method is not allowed.`;
}

const api: Record<string, Function> = {};

api.post = async (restUrlParts: string[], jsonData: any): Promise<string> => {
    if (typeof jsonData.email !== 'string' || jsonData.email === '') {
        return 'Email has to be non-empty text.'
    }

    if (typeof jsonData.username !== 'string' || jsonData.username === '') {
        return 'Username has to be non-empty text.'
    }

    if (typeof jsonData.pass !== 'string' || jsonData.pass === '') {
        return 'Password has to be non-empty text.'
    }

    const keys = Object.keys(jsonData);
    if (keys.length > 3) {
        return 'Registration object has to be with keys: "username", "email" and "pass" only.'
    }

    const [userErr, userMsg] = await file.create('users', jsonData.email + '.json', jsonData);
    if (userErr) {
        return 'User with this email is already registered.';
    }

    return 'User created.';
}
