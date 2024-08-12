const crypto = require('crypto');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
};

function createToken(payload) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const base64Header = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '');

    const signature = crypto.createHmac('sha256', SECRET_KEY)
        .update(`${base64Header}.${base64Payload}`)
        .digest('base64')
        .replace(/=/g, '');

    return `${base64Header}.${base64Payload}.${signature}`;
}

module.exports = { generateCode, createToken };