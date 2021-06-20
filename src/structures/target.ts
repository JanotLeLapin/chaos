import WebSocket from 'ws';
import { Socket } from './socket';

export interface ILocation {
  latitude?: number;
  longitude?: number;
}

export interface ITarget {
  name: string;
  os: string;
  ip: string;
  id: string;
  up: number;
  location: ILocation;
}

export class Target extends Socket {
  name: string;
  os: string;
  ip: string;
  up: Date;
  location: ILocation;

  constructor(socket: WebSocket, data?: any) {
    super(socket);

    if (!data) return;
    this.name = data.name;
    this.os = data.os;
    this.ip = data.ip?.replace('\n', '');
    this.up = new Date(Date.now());
    this.location = {};
  }

  toJSON(): ITarget {
    return {
      name: this.name,
      os: this.os,
      ip: this.ip,
      id: this.id,
      up: this.up.getTime(),
      location: this.location,
    };
  }
}
