import { file } from "../lib/file.js";

export async function loginAPI(httpMethod: string, restUrlParts: string[], jsonData: any): Promise<string> {
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

    if (typeof jsonData.pass !== 'string' || jsonData.pass === '') {
        return 'Password has to be non-empty text.'
    }

    const keys = Object.keys(jsonData);
    if (keys.length > 2) {
        return 'Login object has to be with keys: "email" and "pass" only.'
    }

    const [userErr, userMsg] = await file.read('users', jsonData.email + '.json');
    if (userErr) {
        return 'Incorrect email and/or password.';
    }

    const userObj = JSON.parse(userMsg);
    if (userObj.pass !== jsonData.pass) {
        return 'Incorrect email and/or password.';
    }

    return 'User session created.';
}
