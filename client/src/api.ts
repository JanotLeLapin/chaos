import axios from 'axios';

const baseUrl = 'https://chaos-webapp.herokuapp.com/api/';

export interface Command {
  name: string;
  args: string[];
  from: string;
  to: string;
}

export interface Socket {
  name: string;
  os: string;
  ip: string;
  id: string;
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
}
