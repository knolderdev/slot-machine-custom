import {Reel} from "./Reel.js";
import {Symbol} from "./Symbol.js";

console.log('Slot method is called');
export class Slot {
  constructor(domElement, config = {}) {
    console.log('Slot method is called');
    console.log('Arguments received is domElement, config', domElement,config);
    // Symbol.preload();

    this.currentSymbols = [
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
    ];

    this.nextSymbols = [
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
      ["https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png", "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;

    console.log('reels array is ', this.reels)
    console.log('config is ', this.config);
  }

  spin() {
    this.currentSymbols = this.nextSymbols;
    // This will decide the result so we need to take this from API call if backend does the logic
    this.nextSymbols = [
      ['https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png', Symbol.random(), Symbol.random()],
      ['https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png', Symbol.random(), Symbol.random()],
      ['https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png', Symbol.random(), Symbol.random()],
      ['https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png', Symbol.random(), Symbol.random()],
      ['https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png', Symbol.random(), Symbol.random()],
    ];

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols) {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}
