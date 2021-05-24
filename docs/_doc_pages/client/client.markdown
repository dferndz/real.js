---
layout: page
title: "Creating the client"
number: 10
---

## Initializing a client

Connect the client to url "ws://localhost:8082"

```
const realjs = require("real.js");

const Client = new realjs.RealTimeClient("ws://localhost:8082");

Client.on("open", () => console.log("Connected!"));
```

## Subscribe to a server event:

```
const realjs = require("real.js");

const Client = new realjs.RealTimeClient("ws://localhost:8082");

Client.on("open", () => {
  Client.subscribe("message", payload => {
    console.log("New message from server");
    console.log(payload);
  });
});
```

## Subscribe to a `newUser` event

```
Client.subscribe("newUser", payload => {
  console.log("New user connected to server");
  console.log(payload);
});
```
