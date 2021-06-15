import express from 'express';
import cors from 'cors';

import { Server } from 'ws';

const app = express().use(cors()).use(express.json());

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}.`)
);

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('New connection');
  ws.on('message', (message) => console.log(`Received: ${message}`));
  ws.send('https://github.com/JanotLeLapin');

  ws.on('close', () => console.log('Lost connection'));
});
