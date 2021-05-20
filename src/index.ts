import { Client, Collection } from "discord.js";
import * as dotenv from "dotenv";
import HelpCommand from "./commands/Help";
import ItemCommand from "./commands/Item";
import PingPongCommand from "./commands/PingPong";
import TestCommand from "./commands/Test";
import WikiCommand from "./commands/Wiki";
import { DBotCommand } from "./type";
dotenv.config();

const client = new Client();
const commands = new Collection<string, DBotCommand>();
commands.set("ping", new PingPongCommand());
commands.set("item", new ItemCommand());
commands.set("help", new HelpCommand(commands));
commands.set("wiki", new WikiCommand());
commands.set("test", new TestCommand());

client.once("ready", () => {
  console.log("ready");
});

const prefix: string = process.env.PREFIX ?? "prefix null";

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase()!;

  if (!commands.has(commandName)) return;
  const command = commands.get(commandName);
  await command?.execute(message, args);
});

client.login(process.env.TOKEN);
