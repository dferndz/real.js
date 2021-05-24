import uuid from "node-uuid";

import { IClient, IServer, Server } from "./socket";
import {
  IServerStorage,
  IServerEvent,
  IServerCallback,
  IServerEventHandler,
} from "./types";

export class RealTimeServer<IPayload> {
  server: IServer;
  clients: IClient[];
  eventHandlers: IServerEventHandler<IPayload>;
  clientStorage: IServerStorage;

  constructor(port) {
    this.server = new Server({ port: port });
    this.clients = [] as IClient[];
    this.eventHandlers = [] as any;
    this.clientStorage = [] as any;

    this.server.on("connection", (client: IClient) => {
      client.id = uuid.v4();
      client.storage = [] as any;

      client.on("close", () => {
        this.clients = this.clients.filter((c) => c != client);
      });

      client.on("message", (message) => {
        const data = JSON.parse(message.toString());

        if (data.event && this.eventHandlers[data.event]) {
          this.eventHandlers[data.event](client, data.payload);
        } else if (data.event && this.eventHandlers["any"]) {
          this.eventHandlers["any"](client, data.payload);
        }
      });

      this.clients.push(client);
    });
  }

  subscribe(event: string, callback: IServerCallback<IPayload>) {
    this.eventHandlers[event] = callback;
  }

  publish(client: IClient, event: string, payload: IPayload) {
    const data = JSON.stringify({
      event: event,
      payload: payload,
    });

    client.send(data);
  }

  on(event: IServerEvent, callback: any) {
    this.server.on(event, callback);
  }

  publishAll(event: string, payload: IPayload) {
    this.clients.map((client) => {
      this.publish(client, event, payload);
    });
  }

  addItem(client: IClient, key: string, value: any) {
    client.storage[key] = value;
  }

  getItem(client: IClient, key) {
    return client[key];
  }
}
