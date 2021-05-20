import { Message } from "discord.js";
import puppeteer from "puppeteer";
import { DBotCommand } from "../type";
import * as cheerio from "cheerio";

export default class TestCommand implements DBotCommand {
  readonly commandName: string = "test";
  readonly argsExpected: number = 1;
  readonly expectedUsage: string = "!test <>";

  public async execute(message: Message, args: string[]) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://dontstarve.fandom.com/wiki/${args[0]}`);

    const contents = await page.evaluate(() => {
      return document.querySelector("#mw-content-text > div > aside")
        ?.outerHTML;
    });

    const $ = cheerio.load(contents!, null, false);
    const t = $(".pi-data-value");
    t.each(function (i, el) {
      $(this)
        .contents()
        .each(function (j, ej) {
          if ($(this).is("b")) {
            console.log($(this).find("a").attr("title"));
          } else if ($(this).text() === "") {
            console.log($(this).attr("title"));
          } else {
            console.log($(this).text());
          }
        });
    });
  }
}
