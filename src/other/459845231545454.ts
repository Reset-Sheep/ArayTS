import * as crypto from 'crypto';
type CodingType = 'hex' | 'base64' | '';
type SlgorithmType = 'sha512' |'sha1'|'sha256'|'md5' | "";

function generateSalt(hashLength:number=16): string {
    return crypto.randomBytes(hashLength).toString('hex');
}
function pbkdf2(
    password: string,
    salt: string,
    iterations:number=10000,
    hashLength:number=64,
    algorithm:SlgorithmType='sha512',
    coding:CodingType='hex'
    ): string {
    hashLength = (hashLength=== -1) ? 64 : hashLength;
    // 修正 iterations 的逻辑
    iterations = (iterations < 1 || iterations >= 4294967296) ? 10000 : iterations;
    algorithm = (algorithm === "") ? 'sha512' : algorithm;
    coding = (coding === "") ? 'hex' : coding;
    return crypto.pbkdf2Sync(password, salt, iterations, hashLength, algorithm).toString(coding);
}

function bcrypt(
    password: string,
    salt: string,
    algorithm:SlgorithmType='sha512',
    coding:CodingType='hex'
): string {
    algorithm = (algorithm === "") ? 'sha512' : algorithm;
    coding = (coding === "") ? 'hex' : coding;
    return crypto.createHmac(algorithm, salt).update(password).digest(coding);
}

function scrypt(
    password: string,
    salt: string,
    hashLength:number=64,
    coding:CodingType='hex'
): string {
    hashLength = (hashLength=== -1) ? 64 : hashLength;
    coding = (coding === "") ? 'hex' : coding;
    const key = crypto.scryptSync(password, salt, hashLength);
    return key.toString(coding);
}

function md5(password: string,coding:CodingType='hex'): string {
    coding = (coding === "") ? 'hex' : coding;
    return crypto.createHash('md5').update(password).digest(coding);
}

// Example usage
export { generateSalt as salt, pbkdf2, bcrypt, scrypt, md5 };
