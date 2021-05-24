import { RealTimeClient } from "./client";
import { ACTIONS } from "./interface";

const Client = new RealTimeClient("ws://localhost:8082");

Client.on("open", () => {
  Client.publish(ACTIONS.AUTH, {
    username: "daniel",
  });

  Client.publish(ACTIONS.MESSAGE, {
    data: "My message",
  });

  Client.subscribe(ACTIONS.MESSAGE, (payload) => {
    console.log(payload);
  });
});
