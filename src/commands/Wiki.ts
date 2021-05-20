import { Message } from "discord.js";
import { DBotCommand } from "../type";
import puppeteer from "puppeteer";
import infoBoxParse from "../infoBoxParser";

export default class WikiCommand implements DBotCommand {
  readonly commandName: string = "wiki";
  readonly argsExpected: number = 1;
  readonly expectedUsage: string = "!wiki <content_name>";

  public async execute(message: Message, args: string[]): Promise<any> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://dontstarve.fandom.com/wiki/${args[0]}`);
    const contents = await page.evaluate(() => {
      return document.querySelector(".portable-infobox")?.outerHTML;
    });
    const a = infoBoxParse(contents!);
    console.log(a);
  }
}
