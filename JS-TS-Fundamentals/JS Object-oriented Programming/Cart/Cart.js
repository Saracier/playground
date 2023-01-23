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
      parameter !== 'name' ||
      parameter !== 'category' ||
      parameter !== 'price' ||
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
    this.itemsInTheCart = [];
    this.discountForTheCart;
    this.discountCode = false;
  }

  addItemsToCart(name, category, price, discount) {
    const itemToAdd = new CartItem(name, category, price, discount);
    this.itemsInTheCart.push({ itemInCart: itemToAdd, quantity: 1 });
  }

  removeItemsFromCart(uuid) {
    for (let i = 0; i < this.itemsInTheCart.length; i++) {
      let indexOfContact = this.itemsInTheCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (indexOfContact) {
        if (this.itemsInTheCart[indexOfContact].quantity === 1) {
          this.itemsInTheCart.splice(indexOfContact, 1);
        } else {
          this.itemsInTheCart[indexOfContact].quantity =
            this.itemsInTheCart[indexOfContact].quantity - 1;
        }
      }
    }
  }

  updateQuantityOfItem(uuid, newQuantity) {
    for (let i = 0; i < this.itemsInTheCart.length; i++) {
      let indexOfContact = this.itemsInTheCart.find(
        (el) => el.itemInCart.uuid === uuid
      );
      if (indexOfContact) {
        this.itemsInTheCart[indexOfContact].quantity === newQuantity;
      }
    }
  }

  countCartDiscount() {
    let finalValue = 0;
    for (let i = 0; i < this.itemsInTheCart.length; i++) {
      const priceOfItems =
        this.itemsInTheCart[i].quantity *
        this.itemsInTheCart[i].price *
        this.itemsInTheCart[i].discount;
      finalValue += priceOfItems;
    }
    if (this.discountCode) {
      finalValue = finalValue * this.discountForTheCart;
    }
    return finalValue;
  }
}
