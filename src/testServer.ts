import { RealTimeServer, IClient } from "./server";
import { ACTIONS } from "./interface";

type AuthType = {
  username: string;
};

type MessageType = {
  data: string;
};

const Server = new RealTimeServer({ port: 8082 });

Server.on("listening", () => console.log("Listening"));

Server.on("connection", (client) => {
  console.log(`New client: ${client.id}`);
});

Server.subscribe(ACTIONS.MESSAGE, (client, payload: MessageType) => {
  if (client.storage["username"]) {
    // client is authenticated
    Server.publishAll(ACTIONS.MESSAGE, {
      from: client.storage["username"],
      data: payload.data,
    });
  } else {
    // client not authenticated
    console.log("Client is not authenticated");
  }
});

Server.subscribe(ACTIONS.AUTH, (client, payload: AuthType) => {
  console.log(`New user: ${payload.username}`);
  client.storage["username"] = payload.username;
});
