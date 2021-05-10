import * as bodyParser from 'body-parser';
import express from 'express';
import { IncomingMessage, OutgoingMessage } from 'http';
import supertest from 'supertest';

export const serve = (
  main: (req: IncomingMessage, res: OutgoingMessage) => void
) =>
  supertest(
    express()
      .use(bodyParser.json())
      .get('/', (req, res) => {
        res.status(200).send('ok');
      })
      .post('/', (req, res) => {
        try {
          main(req, res);
        } catch (e) {
          res.status(500).send();
        }
      })
  );
