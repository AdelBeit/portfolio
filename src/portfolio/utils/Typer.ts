export default class Typer {
  inputText: string;
  outputText: string = "";
  element: HTMLSpanElement;
  typerCursor: number = 0;
  cursorCharacter: string = ".";
  typeDelay: number = 10;
  sentenceDelay: number = 400;
  cursorBlinkDelay: number = 400;
  timeout: NodeJS.Timeout;
  typerInterval: NodeJS.Timer;
  cursorBlinkInterval: NodeJS.Timer;

  constructor(element: HTMLSpanElement, text: string) {
    this.element = element;
    this.inputText = text;
  }

  start() {
    this.typerInterval = setInterval(() => {
      this.type();
    }, this.typeDelay);
    this.cursorBlinkInterval = setInterval(() => {
      this.blinkingCursor();
    }, this.cursorBlinkDelay);
  }

  type() {
    if (this.typerCursor >= this.inputText.length) {
      this.stop();
      return;
    }

    const currentChar = this.inputText[this.typerCursor];
    if (currentChar === ".") {
      clearInterval(this.typerInterval);
      this.timeout = setTimeout(() => {
        this.typerInterval = setInterval(() => {
          this.type();
        }, this.typeDelay);
        clearTimeout(this.timeout);
      }, this.sentenceDelay);
    }

    this.outputText += currentChar;
    this.element.innerHTML = this.outputText;
    this.typerCursor++;
  }

  blinkingCursor() {
    this.element.innerHTML =
      this.outputText.slice(0, this.typerCursor) + this.insertCursor();
    return;
  }

  insertCursor() {
    switch (this.cursorCharacter.length) {
      case 0:
        this.cursorCharacter = ".";
        break;
      default:
        this.cursorCharacter = "";
        break;
    }
    return this.cursorCharacter;
  }

  stop() {
    clearInterval(this.typerInterval);
    clearInterval(this.cursorBlinkInterval);
  }
}
