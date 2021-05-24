---
layout: page
title: "Built-in server events"
number: 3
---

## Listening for built-in events

`Server.on(event: IServerEvent, callback)`

```
IServerEvent {
  "close"
  "error"
  "message"
  "listening"
  "connection"
  "headers";
}
```

Example:

```
Server.on("listening", () => console.log("Server is listening..."));

Server.on("connection", client => {
  console.log(`New client ${client.id}`);
})
```
