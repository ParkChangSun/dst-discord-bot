import { Client, Intents } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client();

client.once("ready", () => {
  console.log("ready");
});

const prefix = process.env["PREFIX"];

client.on("message", (message) => {
  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("pong");
  }
});

client.login(process.env["TOKEN"]);
