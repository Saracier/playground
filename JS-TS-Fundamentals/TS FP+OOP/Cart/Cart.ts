// Stwórz strukturę danych związaną ze sklepem internetowym, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący przedmiot
//  Wypracuj obiekt charakteryzujący koszyk

interface Item {
  callName: string;
  category: string;
  price: number;
  discount: number;
  uuid: number;
}

interface ItmInCart {
  itemInCart: Item;
  quantity: number;
}

type ItemsInCart = ItmInCart[];

class CartItem {
  // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
  // Ma umożliwiać:
  // - określać jego rabat procentowy
  // - dodawać produkt do kategorii
  // - zmianę nazwy, ceny lub rabatu

  callName: string;
  category: string;
  price: number;
  discount: number;
  uuid: number;
  constructor(
    callName: string,
    category: string,
    price: number,
    discount: number
  ) {
    this.callName = callName;
    this.category = category;
    this.price = price;
    this.discount = discount;
    this.uuid = Math.random();
  }

  changeCartItemParameters(
    parameter: string,
    newValueOfParameter: string | number
  ) {
    if (
      (parameter === 'price' || parameter === 'discount') &&
      typeof newValueOfParameter === 'number'
    ) {
      this[parameter] = newValueOfParameter;
    }

    if (
      (parameter === 'callName' || parameter === 'category') &&
      typeof newValueOfParameter === 'string'
    ) {
      this[parameter] = newValueOfParameter;
    }
  }
}

class Cart {
  // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
  // Ma umożliwiać:
  // - dodawanie/usuwanie przedmiotów do/z koszyka
  // - zmianę ilości produktu w koszyku
  // - podliczać wartość koszyka uwzględniajac rabaty
  uuid = Math.random();
  itemsInCart: ItemsInCart;
  discountForCart: number;
  discountCode = false;

  addItemsToCart(
    callName: string,
    category: string,
    price: number,
    discount: number
  ) {
    const itemToAdd = new CartItem(callName, category, price, discount);
    this.itemsInCart.push({ itemInCart: itemToAdd, quantity: 1 });
  }

  findItemUuid(nameOfItem: string) {
    const reg = new RegExp(nameOfItem);
    for (let i = 0; i < this.itemsInCart.length; i++) {
      if (reg.test(this.itemsInCart[i].itemInCart.callName)) {
        return this.itemsInCart[i].itemInCart.uuid;
      }
    }
  }

  removeItemsFromCart(uuid: number) {
    for (let i = 0; i < this.itemsInCart.length; i++) {
      let itemFound = this.itemsInCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (itemFound) {
        let indexOfContact = this.itemsInCart.indexOf(itemFound);
        if (this.itemsInCart[indexOfContact].quantity === 1) {
          this.itemsInCart.splice(indexOfContact, 1);
        } else {
          this.itemsInCart[indexOfContact].quantity =
            this.itemsInCart[indexOfContact].quantity - 1;
        }
      }
    }
  }

  updateQuantityOfItem(uuid: number, newQuantity: number) {
    for (let i = 0; i < this.itemsInCart.length; i++) {
      let itemFound = this.itemsInCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (itemFound) {
        let indexOfContact = this.itemsInCart.indexOf(itemFound);
        this.itemsInCart[indexOfContact].quantity === newQuantity;
      }
    }
  }

  countTotal() {
    let finalValue = 0;
    for (let i = 0; i < this.itemsInCart.length; i++) {
      const priceOfItems =
        this.itemsInCart[i].quantity *
        this.itemsInCart[i].itemInCart.price *
        this.itemsInCart[i].itemInCart.discount;
      finalValue += priceOfItems;
    }
    if (this.discountCode) {
      finalValue = finalValue * this.discountForCart;
    }
    return finalValue;
  }
}
