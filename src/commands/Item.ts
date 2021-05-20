import { Message } from "discord.js";
import { DBotCommand } from "../type";

export default class ItemCommand implements DBotCommand {
  readonly commandName: string = "item";
  readonly argsExpected: number = 1;
  readonly expectedUsage: string = "item <itemName>";
  public execute(message: Message, args: string[]): void {
    if (args.length !== this.argsExpected) {
      message.channel.send("not expected usage");
      return;
    }
    message.channel.send(`${args[0]} description message`);
  }
}
