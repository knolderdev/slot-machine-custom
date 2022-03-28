const cache = {};

export class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = `${name}`;

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "https://i.postimg.cc/xdmyR81y/42fc8e6ff65e932ec687a441876d7780.png",
      "https://i.postimg.cc/1tcGkd68/44ee3950d147632fd4c114427ae8fbf9.png",
      "https://i.postimg.cc/J0pbnBpm/c4b87c0b260fb0a96f204d8e519985df.png",
      "https://i.postimg.cc/kGJQqyFf/dd99fa01549355633e523021eaa8b905.png",
      "https://i.postimg.cc/xCSGFQkr/f012c169dc5d03ef03cf965b678a2fbf.png"
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
