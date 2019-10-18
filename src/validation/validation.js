import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const getFileData = (reader, options) => (filePath) => new Promise((res, rej) => {
  try {
    const data = reader(filePath, options);
    res(data.slice(0, -1));
  } catch (error) {
    rej(error);
  }
});

const fileSyncReader = getFileData(fs.readFileSync, 'utf-8');
const filePath = path.resolve('./src/validation');

const publicKey = fs.readFileSync(filePath + '/public.key', 'utf-8');
const privateKey = fs.readFileSync(filePath + '/private.key', 'utf-8');

console.log(publicKey, privateKey);

const jwtOptions = {
  expiresIn: '1d',
  algorithm: 'RS256',
};

export const sign = (payload) => {
  return jwt.sign(payload, privateKey, jwtOptions);
};

export const verify = (token) => {
  try {
    return !!jwt.verify(token, publicKey, jwtOptions);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const decode = (token) => {
  return jwt.decode(token, { complete: true });
};

