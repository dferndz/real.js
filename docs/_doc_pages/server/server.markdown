---
layout: page
title: "Creating the server"
number: 2
---

## Initialize a server on port 8082:

```
const realjs = require("real.js");

const Server = new realjs.RealTimeServer({ port: 8082 });

Server.on("connection", () => console.log("New client"));
```

## Send a `message` event to a new client

You can send any dictionary with primitive types to the client.

```
Server.on("connection", client => {

  // send message to new client

  Server.publish(client, "message", {
    myCustomAction: "new_user",
    message: "New user connected"
  });

});
```

## Send a `message` event to all connected clients

```
Server.on("connection", client => {

  // send message to all clients

  Server.publishAll("message", {
    myCustomAction: "new_user",
    message: "New user connected"
  });

});
```

## Events are user-defined

We can send a `newUser` event on a new connection

```
Server.on("connection", client => {

  // send message to all clients

  Server.publishAll("newUser", {
    detail: "New user connected"
  });

});
```
