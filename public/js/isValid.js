export function isValidUsername(str) {
    const [strErr, strMsg] = isValidString(str, 4, 20);
    if (strErr) {
        return [true, 'Username has to be correct size.'];
    }

    const [symbErr, symbMsg] = isStringFromSymbols(str, { lower: true, upper: true, });
    if (symbErr) {
        return [symbErr, symbMsg];
    }

    return [false, 'Ok'];
}

export function isValidEmail(str) {
    const [strSizeErr, strSizeMsg] = isValidString(str, 6, 100);
    if (strSizeErr) {
        return [strSizeErr, strSizeMsg];
    }

    const etaParts = str.split('@');
    if (etaParts.length < 2) {
        return [true, 'Missing "@" symbol.'];
    }
    if (etaParts.length > 2) {
        return [true, 'To many "@" symbols.'];
    }

    const beforeParts = etaParts[0].split('.');
    const afterParts = etaParts[1].split('.');
    const allParts = [...beforeParts, ...afterParts];

    if (afterParts.length < 2) {
        return [true, 'Part after "@" does not seems to be an email service provider.'];
    }

    for (const b of allParts) {
        const [sizeErr, sizeMsg] = isValidString(b, 1, 64);
        if (sizeErr) {
            return [true, 'Each part between dots (.) has to be between 1..64 symbols.'];
        }

        const [symbErr, symbMsg] = isStringFromSymbols(b, { lower: true, upper: true, numbers: true, extra: '-' });
        if (symbErr) {
            return [symbErr, symbMsg];
        }
    }

    return [false, 'Ok'];
}

export function isValidPassword(str) {
    const [strSizeErr, strSizeMsg] = isValidString(str, 12, 100);
    if (strSizeErr) {
        return [strSizeErr, strSizeMsg];
    }
    return [false, 'Ok'];
}

export function isValidString(str, min = 1, max = 100) {
    if (typeof str !== 'string') {
        return [true, 'Has to be a text.'];
    }
    if (str.length < min) {
        return [true, `Has to be minimum ${min} symbols size.`];
    }
    if (str.length > max) {
        return [true, `Has to be maximum ${max} symbols size.`];
    }
    return [false, 'Ok'];
}

export function isStringFromSymbols(str, params) {
    const abcLower = 'abcdefghijklmnopqrstuvwxyz';
    const abcUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789';

    let list = '';
    if (params.lower) list += abcLower;
    if (params.upper) list += abcUpper;
    if (params.numbers) list += numbers;
    if (params.extra) list += params.extra;

    if (list === '') list = abcLower + abcUpper + numbers;

    for (const s of str) {
        if (!list.includes(s)) {
            return [true, `Not allowed symbol "${s}".`];
        }
    }

    return [false, 'Ok'];
}

export const isValid = {
    username: isValidUsername,
    email: isValidEmail,
    password: isValidPassword,
    string: isValidString,
    stringFromSymbols: isStringFromSymbols,
};

export default isValid;