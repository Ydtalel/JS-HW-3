class Good {
  constructor(id, name, description, sizes, price, available) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.sizes = sizes;
    this.price = price;
    this.available = available;
  }
  setAvailable() {
    this.available = !this.available;
  }
}


class GoodsList {
  #goods;
  constructor(...goods) {
    this.#goods = [...goods];
    this.filter = '';
    this.sortPrice = false;
    this.sortDir = true;
  }

  get list() {
    let filteredGoods = this.#goods.filter(good => good.available);
    if (this.filter) {
      filteredGoods = filteredGoods.filter(good => new RegExp(this.filter, "i").test(good.name));
    }
    if (this.sortPrice) {
      filteredGoods = filteredGoods.sort((g1, g2) => g1.price - g2.price);
    }
    if (!this.sortDir) {
      filteredGoods.reverse();
    }

    return filteredGoods
  }

  add(product) {
    this.#goods.push(product);
  }

  remove(id) {
    const index = this.#goods.findIndex(good => good.id === id);
    if (index !== -1) {
      this.#goods.splice(index, 1);
    }
  }
}


class BasketGood extends Good {
  constructor(good, amount) {
    super(good.id, good.name, good.description, good.sizes, good.price, good.available);
    this.amount = amount;
  }
}

class Bascket {
  constructor(...goods) {
    this.goods = [...goods];
  }
  get totalAmount() {
    let total = this.goods.reduce((acc, good) => acc + good.amount, 0);
    return total;
  }
  get totalSum() {
    let sum = this.goods.reduce((acc, good) => acc + good.amount * good.price, 0);
    return sum;
  }
  add(good, amount = 1) {
    const existingGood = this.goods.find(item => item === good);
    if (existingGood) {
      existingGood.amount += amount;
    } else {
      good.amount = amount;
      this.goods.push(good);
    }

  }
  remove(good, amount = 1) {
    const index = this.goods.indexOf(good);
    if (index > -1) {
      this.goods[index].amount -= amount;
      if (this.goods[index].amount < 1) {
        this.goods.splice(index, 1);
      }
    }
  }
  clear() {
    this.goods = [];
  }
  removeUnavailable() {
    this.goods = this.goods.filter(good => good.available);
    return this.goods;
  }
}

const g1 = new Good(1, 't-shirt', 'black t-shirt for man', ['l', 'xl', 'xxl'], 100, true);
const g2 = new Good(2, 'shorts', 'pink shorts for wooman', ['m', 'l', 'xl', 'xxl'], 150, true);
const g3 = new Good(3, 'socks', 'white socks for everyone', ['s', 'm', 'l'], 60, true);
const g4 = new Good(4, 'jeans', 'blue jeans for kids', ['s', 'm', 'l', 'xl'], 120, false);
const g5 = new Good(5, 'hat', 'black hat for adults', ['m', 'l'], 80, true);

const gl1 = new GoodsList(g1, g2, g3, g4);
gl1.add(g5);
gl1.remove(3);
gl1.filter = 't-shirt';
gl1.sortPrice = true;
gl1.sortDir = false;
const resultList = gl1.list;
//console.log(resultList)

const bg1 = new BasketGood(g1);
bg1.amount = 5;
const bg2 = new BasketGood(g5);
bg2.amount = 2;
const bg3 = new BasketGood(g2);
bg3.amount = 1;
const bg4 = new BasketGood(g3);
bg4.amount = 1;
const bg5 = new BasketGood(g4);
bg5.amount = 1;

b1 = new Bascket(bg1, bg2, bg3);
//console.log(b1);
//console.log(b1.totalAmount);
//console.log(b1.totalSum);
b1.add(bg5);
//console.log(b1);
b1.removeUnavailable();
//console.log(b1);
b1.add(bg4, 2);
b1.add(bg1);
//console.log(b1);
b1.remove(bg3);
b1.remove(bg2, 2);
//console.log(b1);
b1.clear();
console.log(b1);