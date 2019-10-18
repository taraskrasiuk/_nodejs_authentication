import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import * as validation from './validation/validation';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SECRET = 'qwe';

const PORT = 8080;

const loginRouter = new express.Router();

const apiRouter = new express.Router();

const tempUsers = {

};


loginRouter.post('/register', async (req, res) => {
  const { name, password } = req.body;
  // validate that name and password exist
  try {
    tempUsers[name] = await bcrypt.hash(password, 10);
    const jwtToken = validation.sign({ name });

    res.status(200).send(jwtToken);

  } catch (e) {
    console.error(e);

    res.status(500).send({
      error: 'smth wrong',
    });
  }
});

loginRouter.post('/login', async (req, res) => {

  const { name, password } = req.body;

  try {

    if (tempUsers[name]) {
      const isMatch = await bcrypt.compare(password, tempUsers[name]);

      if (isMatch) {
        const jwtToken = validation.sign({ name });

        res.status(200).send(jwtToken);
      } else {
        res.status(401).send({
          error: 'Password is incorrect',
        })
      }
    } else {
      res.status(401).send({});
    }

  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 'error' });
  }

});

apiRouter.use('*', async (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  if (validation.verify(token)) {
    next();
  } else {
    res.status(501).send({
      error: 'Authorization failed',
    });
  }
});

apiRouter.get('/todos', async (req, res) => {
  res.status(200).send({
    data: [
      {
        id: '1',
      },
    ],
  })
});

app.use(loginRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
