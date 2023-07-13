import { DataForHandlers } from './server.js';

export function cookieParser(cookieString: string): Record<string, string> {
    const cookies = cookieString.split('; ');
    const cookiesObj: Record<string, string> = {};
    for (const str of cookies) {
        const [key, value] = str.split('=') as [string, string];
        cookiesObj[key] = value;
    }
    return cookiesObj;
}

export async function isUserLoggedIn(data: DataForHandlers, tokenString: string | undefined): Promise<boolean> {
    if (typeof tokenString !== 'string') {
        return false;
    }

    const tokenQueryString = `SELECT * FROM tokens WHERE token LIKE '${tokenString}';`;
    let tokenDBresponse: any = null;

    try {
        tokenDBresponse = await data.dbConnection.query(tokenQueryString);  // [[], []]
    } catch (error) {
        return false;
    }

    const tokensFromDb = tokenDBresponse[0];
    if (tokensFromDb.length !== 1) {
        return false;
    }

    const tokenObj = tokensFromDb[0];
    const { createdAt } = tokenObj;
    const now = new Date().getTime();

    return createdAt.getTime() + 3600000 >= now;
}