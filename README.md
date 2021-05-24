# Real.js

Simple server-client interface that uses an event-driven design.

## Installation

`npm install real.js`  
`yarn add real.js`

## Usage

### Server:

```
const realjs = require("real.js");

const Server = new realjs.RealTimeServer({ port: 8082 });

Server.on("connection", () => console.log("New client"));
```

### Client:

```
const realjs = require("real.js");

const Client = new realjs.RealTimeClient("ws://localhost:8082");

Client.on("open", () => console.log("Connected!"));
```

### Subscribe to a server event:

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

Publish the event from the server

```
const realjs = require("real.js");

const Server = new realjs.RealTimeServer({ port: 8082 });

Server.on("connection", client => {
  // send message to new client
  Server.publish(client, "message", {
    myCustomAction: "new_user",
    message: "New user connected"
  });
});
```
