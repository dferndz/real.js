export type ICallback<T> = (payload?: T) => void;

export interface IEventHandler<T> {
  [index: string]: ICallback<T>;
}

export type IClientEvent = "close" | "error" | "message" | "open";
