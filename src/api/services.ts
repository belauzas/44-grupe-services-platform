import { APIresponse, DataForHandlers } from "../lib/server.js";

export async function servicesAPI(data: DataForHandlers): Promise<APIresponse> {
    const availableHttpMethods = ['get', 'post', 'put', 'delete'];
    const { httpMethod } = data;

    if (availableHttpMethods.includes(httpMethod) && httpMethod in api) {
        return await api[httpMethod]!(data);
    }

    return {
        statusCode: 405,
        headers: {},
        body: `"${httpMethod}" HTTP method is not allowed.`,
    };
}

const api: Record<string, Function> = {};

api.post = async (data: DataForHandlers): Promise<APIresponse> => {
    const title = 'C'.repeat(30);
    const queryString = `INSERT INTO services (id, title, description, price, photo, isActive) VALUES (NULL, '${title}', 'DESCRIPTION', '1.23', '', '1');`;

    try {
        await data.dbConnection.query(queryString);
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 201,
        headers: {},
        body: 'Service created.',
    };
}

api.get = async (data: DataForHandlers): Promise<APIresponse> => {
    return {
        statusCode: 200,
        headers: {},
        body: 'Services list data.',
    };
}

api.put = async (data: DataForHandlers): Promise<APIresponse> => {
    return {
        statusCode: 200,
        headers: {},
        body: 'Service updated.',
    };
}

api.delete = async (data: DataForHandlers): Promise<APIresponse> => {
    return {
        statusCode: 200,
        headers: {},
        body: 'Service deleted.',
    };
}
