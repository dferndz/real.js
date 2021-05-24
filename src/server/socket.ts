import WebSocket from "ws";
import { IServerStorage } from "./types";

export class IClient extends WebSocket {
  id: string;
  storage: IServerStorage;
}

export const Server = WebSocket.Server;

export type IServer = WebSocket.Server;
