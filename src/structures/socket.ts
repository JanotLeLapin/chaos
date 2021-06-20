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

  private pings = 0;

  constructor(socket: WebSocket) {
    this.id = Math.floor(Math.random() * Date.now()).toString();
    this.socket = socket;

    let interval = setInterval(() => {
      if (this.pings >= 2) {
        socket.close();
        clearInterval(interval);
      }
      try {
        socket.ping();
        this.pings++;
      } catch (err) {
        console.error(err);
      }
    }, 45000);
    socket.on('pong', () => (this.pings = 0));
    socket.on('close', () => clearInterval(interval));
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
