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
