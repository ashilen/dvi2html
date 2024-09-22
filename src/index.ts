import color from "./specials/color";
import svg from "./specials/svg";
import html from "./specials/html";
import papersize from "./specials/papersize";
import title from "./specials/title";

import HTMLMachine from "./html";
import TextMachine from "./text";

export var Machines = {
  HTML: HTMLMachine,
  text: TextMachine
};

import { dviParser, execute, mergeText } from "./parser";

export var specials = {
  color: color,
  svg: svg,
  html: html,
  papersize: papersize
};

export function dvi2html(dviStream, htmlStream) {
  let parser = title(papersize(html(svg(color(mergeText(dviParser(dviStream)))))));

  let machine = new HTMLMachine(htmlStream);

  execute(parser, machine);

  return machine;
}

import { tfmData } from "./tfm/index";


export { tfmData, dviParser, execute, mergeText };
