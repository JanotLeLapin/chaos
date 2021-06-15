import WebSocket from 'ws';
import { Socket } from './socket';

export class Target extends Socket {
  name: string;
  os: string;
  ip: string;

  constructor(socket: WebSocket, data?: any) {
    super(socket);

    if (!data) return;
    this.name = data.name;
    this.os = data.os;
    this.ip = data.ip;
  }
}
