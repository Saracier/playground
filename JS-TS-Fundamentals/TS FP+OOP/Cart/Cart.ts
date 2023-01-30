// Stwórz strukturę danych związaną ze sklepem internetowym, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący przedmiot
//  Wypracuj obiekt charakteryzujący koszyk

class CartItem {
  // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
  // Ma umożliwiać:
  // - określać jego rabat procentowy
  // - dodawać produkt do kategorii
  // - zmianę nazwy, ceny lub rabatu
  constructor(name, category, price, discount) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.discount = discount;
    this.uuid = Math.random();
  }

  changeCartItemParameters(parameter, newValueOfParameter) {
    if (
      parameter !== 'name' &&
      parameter !== 'category' &&
      parameter !== 'price' &&
      parameter !== 'discount'
    ) {
      return;
    }
    this[parameter] = newValueOfParameter;
  }
}

class Cart {
  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać:
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty

  constructor() {
    this.uuid = Math.random();
    this.itemsInCart = [];
    this.discountForCart;
    this.discountCode = false;
  }

  addItemsToCart(name, category, price, discount) {
    const itemToAdd = new CartItem(name, category, price, discount);
    this.itemsInCart.push({ itemInCart: itemToAdd, quantity: 1 });
  }

  findItemUuid(nameOfItem) {
    const reg = new RegExp(nameOfItem);
    for (let i = 0; i < this.itemsInCart.length; i++) {
      if (reg.test(this.itemsInCart[i].itemInCart.name)) {
        return this.itemsInCart[i].itemInCart.uuid;
      }
    }
  }

  removeItemsFromCart(uuid) {
    for (let i = 0; i < this.itemsInCart.length; i++) {
      let indexOfContact = this.itemsInCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (indexOfContact) {
        if (this.itemsInCart[indexOfContact].quantity === 1) {
          this.itemsInCart.splice(indexOfContact, 1);
        } else {
          this.itemsInCart[indexOfContact].quantity =
            this.itemsInCart[indexOfContact].quantity - 1;
        }
      }
    }
  }

  updateQuantityOfItem(uuid, newQuantity) {
    for (let i = 0; i < this.itemsInCart.length; i++) {
      let indexOfContact = this.itemsInCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (indexOfContact) {
        this.itemsInCart[indexOfContact].quantity === newQuantity;
      }
    }
  }

  countTotal() {
    let finalValue = 0;
    for (let i = 0; i < this.itemsInCart.length; i++) {
      const priceOfItems =
        this.itemsInCart[i].quantity *
        this.itemsInCart[i].price *
        this.itemsInCart[i].discount;
      finalValue += priceOfItems;
    }
    if (this.discountCode) {
      finalValue = finalValue * this.discountForCart;
    }
    return finalValue;
  }
}
