import WebSocket from 'ws';
import { Socket } from './socket';

export interface ITarget {
  name: string;
  os: string;
  ip: string;
  id: string;
  up: number;
}

export class Target extends Socket {
  name: string;
  os: string;
  ip: string;
  up: Date;

  constructor(socket: WebSocket, data?: any) {
    super(socket);

    if (!data) return;
    this.name = data.name;
    this.os = data.os;
    this.ip = data.ip;
    this.up = new Date(Date.now());
  }

  toJSON(): ITarget {
    return {
      name: this.name,
      os: this.os,
      ip: this.ip,
      id: this.id,
      up: this.up.getTime(),
    };
  }
}
