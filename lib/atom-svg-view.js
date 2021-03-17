"use babel";

export default class AtomSvgView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement("div");
    this.element.classList.add("atom-svg");

    // Create message element
    const message = document.createElement("div");
    message.textContent = "The AtomSvg package is Alive! It's ALIVE!";
    message.classList.add("message");
    this.element.appendChild(message);

    console.dir(serializedState);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
