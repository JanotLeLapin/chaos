import axios from 'axios';

const baseUrl = isProduction
  ? 'https://chaos-webapp.herokuapp.com/api/'
  : 'http://localhost:5000/api/';

export type CommandName =
  | 'open'
  | 'greet'
  | 'targetAdd'
  | 'targetQuit'
  | 'targetKick'
  | 'cmd';

export interface Command {
  name: CommandName;
  data: any;
  from: string;
  to: string;
}

export interface Socket {
  name: string;
  os: string;
  ip: string;
  id: string;
  up: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export class Api {
  static targets(): Promise<Socket[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(baseUrl + 'targets');
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static target(id: string): Promise<Socket> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(baseUrl + 'targets/' + id);
        resolve({
          ...data,
          up: new Date(data.up),
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static locate(id: string): Promise<Location> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(baseUrl + 'targets/' + id + '/locate');
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
