import { RealTimeServer } from "./server";
import { IClient } from "./socket";
import {
  IServerEvent,
  IServerCallback,
  IServerEventHandler,
  IServerStorage,
} from "./types";

export type {
  IServerEvent,
  IServerCallback,
  IServerEventHandler,
  IServerStorage,
  IClient,
};
export { RealTimeServer };

export default RealTimeServer;
