import { Collection, Message } from "discord.js";
import { DBotCommand } from "../type";

export default class HelpCommand implements DBotCommand {
  readonly commandName: string = "help";
  readonly argsExpected: number = 1;
  readonly expectedUsage: string = "!help <commandName>";

  constructor(private collection: Collection<string, DBotCommand>) {}

  public execute(message: Message, args: string[]) {
    if (args.length === 0) {
      const allCommands = this.collection.map((command) => command.commandName);
      message.channel.send(`commands : ${allCommands}`);
    } else {
      const command = this.collection.get(args[0]);
      if (command) {
        message.channel.send(command.expectedUsage);
      } else {
        message.channel.send("command not found");
      }
    }
  }
}
