import WebSocket from 'ws';

export interface Command {
  name: string;
  data: any;
  from: string;
  to: string;
}

export class Socket {
  id: string;
  socket: WebSocket;

  constructor(socket: WebSocket) {
    this.id = Math.floor(Math.random() * Date.now()).toString();
    this.socket = socket;
  }

  send(name: string, data: any, from?: string) {
    this.socket.send(
      JSON.stringify({
        name,
        data,
        from: from || '-1',
        to: this.id,
      })
    );
  }
}
