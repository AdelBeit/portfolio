export default class Typer {
  inputText: string;
  outputText: string = "";
  element: HTMLElement;
  typerCursor: number = 0;
  cursorCharacter: string = ".";
  typeDelay: number = 10;
  sentenceDelay: number = 400;
  scrambleDuration: number = 400;
  timeout: NodeJS.Timeout;
  typerInterval: NodeJS.Timer;
  scramblerInterval: NodeJS.Timer;

  constructor(selector, text) {
    this.element = document.querySelector(selector);
    this.inputText = text;
    this.typerInterval = setInterval(() => {
      this.type();
    }, this.typeDelay);
    this.scramblerInterval = setInterval(() => {
      this.scramble();
    }, this.scrambleDuration);
  }

  type() {
    if (this.typerCursor >= this.inputText.length) {
      clearInterval(this.typerInterval);
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

  scramble() {
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

  destroy() {
    clearInterval(this.typerInterval);
    clearInterval(this.scramblerInterval);
  }
}
