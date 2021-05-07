import { Client, Collection, Intents } from "discord.js";
import * as dotenv from "dotenv";
import HelpCommand from "./commands/Help";
import ItemCommand from "./commands/Item";
import PingPongCommand from "./commands/PingPong";
import { DBotCommand } from "./type";
dotenv.config();

const client = new Client();
const commands = new Collection<String, DBotCommand>();
commands.set("ping", new PingPongCommand());
commands.set("item", new ItemCommand());
commands.set("help", new HelpCommand(commands));

client.once("ready", () => {
  console.log("ready");
});

const prefix: string = process.env.PREFIX ?? "prefix null";

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase()!;

  if (!commands.has(commandName)) return;
  const command = commands.get(commandName);
  command?.execute(message, args);
});

client.login(process.env.TOKEN);
