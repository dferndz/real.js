import WebSocket from "ws";
import { ICallback, IEventHandler } from "./types";

type WSClientEvent = "close" | "error" | "message" | "open";

export class RealTimeClient<IPayload> {
  url: string;
  WSClient: WebSocket;
  eventHandlers: IEventHandler<IPayload>;

  constructor(url) {
    this.url = url;
    this.eventHandlers = [] as any;

    this.initWSClient();
  }

  initWSClient() {
    this.WSClient = new WebSocket(this.url);
    this.WSClient.onerror = (error) => {};

    this.WSClient.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.event && this.eventHandlers[data.event]) {
        this.eventHandlers[data.event](data.payload);
      } else if (data.event && this.eventHandlers["any"]) {
        this.eventHandlers["any"](data.payload);
      }
    });

    this.WSClient.addEventListener("close", () => {
      if (this.eventHandlers["close"]) {
        this.eventHandlers["close"]();
      }
    });
  }

  subscribe(event: string, callback: ICallback<IPayload>) {
    this.eventHandlers[event] = callback;
  }

  publish(event: string, payload: IPayload) {
    const data = JSON.stringify({
      event: event,
      payload: payload,
    });

    this.WSClient.send(data);
  }

  reconnect() {
    this.WSClient.terminate();
    delete this.WSClient;
    this.initWSClient();
  }

  on(event: WSClientEvent, callback: any) {
    this.WSClient.addEventListener(event, callback);
  }
}
