import { writable } from 'svelte/store';
import type { Command } from './api';

const messageStore = writable<Command>({
  name: 'open',
  data: {},
  from: '-1',
  to: '-1',
});

let socket: WebSocket;

// Open WebSocket connection
export const openConnection = () => {
  socket = new WebSocket(
    isProduction ? 'ws://chaos-webapp.herokuapp.com' : 'ws://localhost:5000'
  );

  socket.addEventListener('open', () =>
    sendCommand({
      name: 'greet',
      data: {
        t: 'client',
      },
      from: '-1',
      to: '-1',
    })
  );

  // Listen for messages
  socket.addEventListener('message', (event) => {
    messageStore.set(JSON.parse(event.data));
  });
};

export const sendCommand = (command: Command) => {
  if (socket.readyState <= 1) {
    socket.send(JSON.stringify(command));
  }
};

export const subscribe = messageStore.subscribe;
