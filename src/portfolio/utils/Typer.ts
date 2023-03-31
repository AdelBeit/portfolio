export default class Typer {
  inputText: string;
  outputText: string = "";
  element: HTMLSpanElement;
  typerCursor: number = 0;
  cursorCharacter: string = ".";
  typeDelay: number = 10;
  sentenceDelay: number = 400;
  cursorBlinkDelay: number = 800;
  timeout: NodeJS.Timeout;
  typerInterval: NodeJS.Timer;
  cursorBlinkInterval: NodeJS.Timer;
  doneTyping: Promise<boolean>;
  doneTypingResolve: (value?: boolean | PromiseLike<boolean>) => void;

  constructor(element: HTMLSpanElement, text: string) {
    this.element = element;
    this.inputText = text;
    this.doneTyping = new Promise<boolean>((res) => {
      this.doneTypingResolve = res;
    });
  }

  start() {
    this.typerInterval = setInterval(() => {
      this.type();
    }, this.typeDelay);
    this.cursorBlinkInterval = setInterval(() => {
      this.blinkingCursor();
    }, this.cursorBlinkDelay);
    return this.doneTyping;
  }

  type() {
    if (this.typerCursor >= this.inputText.length) {
      this.stopTyping();
      this.stopBlinking();
      this.element.innerHTML = this.outputText + ".";
      this.doneTypingResolve(true);
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
    this.stopTyping();
    this.stopBlinking();
  }

  stopBlinking() {
    clearInterval(this.cursorBlinkInterval);
  }

  stopTyping() {
    clearInterval(this.typerInterval);
  }
}
