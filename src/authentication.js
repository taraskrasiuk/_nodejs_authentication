const jwt = require('jsonwebtoken');

const SECRET = 'secret123';

const token = jwt.sign({
  foo: 'bar',
  exp: Math.floor(Date.now() / 1000),
}, SECRET);

setTimeout(() => {
  try {
    const verified = jwt.verify(token, SECRET);
    console.log(verified);
  } catch (e) {
    console.log(e);
    console.log('SHOULD throw an error');
  }
}, 5000);

