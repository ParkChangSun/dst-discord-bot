import { Message } from "discord.js";
import { DBotCommand } from "../type";

export default class PingPongCommand implements DBotCommand {
  readonly commandName: string = "ping";
  readonly argsExpected: number = 0;
  readonly expectedUsage: string = "!ping";
  public execute(message: Message, args: string[]): void {
    message.channel.send("pong");
  }
}
