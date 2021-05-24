import { RealTimeServer } from "./server";
import { IClient } from "./server";
import {
  IServerEvent,
  IServerCallback,
  IServerEventHandler,
  IServerStorage,
} from "./server";
import { RealTimeClient } from "./client";
import { IEventHandler, ICallback } from "./client";

export type {
  IServerEvent,
  IServerCallback,
  IServerEventHandler,
  IServerStorage,
  IClient,
};
export type { IEventHandler, ICallback };

export { RealTimeClient, RealTimeServer };

export default RealTimeClient;
