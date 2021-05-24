import WebSocket from "ws";
import { IClient } from "./socket";

export type IServerEvent =
  | "close"
  | "error"
  | "message"
  | "listening"
  | "connection"
  | "headers";

export interface IServerStorage {
  [index: string]: any;
}

export type IServerCallback<T> = (client?: IClient, paylpad?: T) => void;

export interface IServerEventHandler<T> {
  [index: string]: IServerCallback<T>;
}
