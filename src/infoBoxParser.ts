import * as cheerio from "cheerio";

export default function infoBoxParse(str: string): string[] {
  const $ = cheerio.load(str, null, false);
  $("div[data-source='description']").remove();
  const infoBox: string[] = [];
  infoBox.push(...labelParse($));
  infoBox.push(...valueParse($));

  return infoBox;
}

function labelParse($: cheerio.CheerioAPI): string[] {
  let label: string[] = [];
  $(".pi-data-label").each(function (i, el): boolean | void {
    if ($(this).first().find("img").length === 1) {
      label.push($(this).find("img").attr("alt")!);
    } else {
      label.push($(this).text());
    }
  });
  return label;
}

function valueParse($: cheerio.CheerioAPI): string[] {
  let value: string[] = [];
  $(".pi-data-value").each(function (i, el) {
    let v: string = "";
    $(this)
      .contents()
      .each(function (j, ej) {
        if ($(this).is("b")) {
          v += $(this).find("a").attr("title");
        } else if ($(this).text() === "") {
          v += $(this).attr("title");
        } else {
          v += $(this).text();
        }
      });
    value.push(v);
  });
  return value;
}
