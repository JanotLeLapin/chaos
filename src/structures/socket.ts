import WebSocket from 'ws';

export interface Command {
  name: string;
  args: string[];
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

  send(name: string, args: string[], from?: string) {
    this.socket.send(
      JSON.stringify({
        name,
        args,
        from: from || '-1',
        to: this.id,
      })
    );
  }
}
