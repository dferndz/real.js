# Real.js

Simple server-client interface that uses an event-driven design.

## Installation

`npm install real.js`  
`yarn add real.js`

## Documentation

[dferndz.github.io/real.js/](https://dferndz.github.io/real.js/)

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
