import { file } from "../lib/file.js";
import { APIresponse, DataForHandlers } from "../lib/server.js";

export async function registerAPI(data: DataForHandlers): Promise<APIresponse> {
    const availableHttpMethods = ['post'];
    if (availableHttpMethods.includes(data.httpMethod) && data.httpMethod in api) {
        return await api[data.httpMethod]!(data);
    }

    return {
        statusCode: 405,
        headers: {},
        body: `"${data.httpMethod}" HTTP method is not allowed.`,
    };
}

const api: Record<string, Function> = {};

api.post = async (data: DataForHandlers): Promise<APIresponse> => {
    const { payload } = data;

    if (typeof payload.email !== 'string' || payload.email === '') {
        return {
            statusCode: 422,
            headers: {},
            body: `Email has to be non-empty text.`,
        };
    }

    if (typeof payload.username !== 'string' || payload.username === '') {
        return {
            statusCode: 422,
            headers: {},
            body: 'Username has to be non-empty text.',
        };
    }

    if (typeof payload.pass !== 'string' || payload.pass === '') {
        return {
            statusCode: 422,
            headers: {},
            body: 'Password has to be non-empty text.',
        };
    }

    const keys = Object.keys(payload);
    if (keys.length > 3) {
        return {
            statusCode: 422,
            headers: {},
            body: 'Registration object has to be with keys: "username", "email" and "pass" only.',
        };
    }

    // const [userErr, userMsg] = await file.create('users', payload.email + '.json', payload);
    // if (userErr) {
    //     return {
    //         statusCode: 409,
    //         headers: {},
    //         body: 'User with this email is already registered.',
    //     };
    // }

    const queryString = `INSERT INTO users (username, email, password) VALUES ('${payload.username}', '${payload.email}', '${payload.pass}');`;

    try {
        await data.dbConnection.query(queryString);
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 201,
        headers: {},
        body: 'User created.',
    };
}
