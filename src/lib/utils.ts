import { file } from './file.js';

export function cookieParser(cookieString: string): Record<string, string> {
    const cookies = cookieString.split('; ');
    const cookiesObj: Record<string, string> = {};
    for (const str of cookies) {
        const [key, value] = str.split('=') as [string, string];
        cookiesObj[key] = value;
    }
    return cookiesObj;
}

export async function isUserLoggedIn(tokenString: string | undefined): boolean {
    if (typeof tokenString !== 'string') {
        return false;
    }

    const [tokenErr, tokenMsg] = await file.read('token', tokenString + '.json');
    if (tokenErr) {
        return false;
    }

    const tokenObj = JSON.parse(tokenMsg);
    const { email, createdAt } = tokenObj;

    const now = new Date().getTime();
    if (createdAt + 3600000 < now) {
        return false;
    }

    return true;
}