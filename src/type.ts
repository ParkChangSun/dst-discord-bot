import { Message } from "discord.js";

export interface DBotCommand {
  readonly commandName: string;
  readonly argsExpected: number;
  readonly expectedUsage: string;
  execute(message: Message, args: string[]): void;
}
