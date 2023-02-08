// Stwórz strukturę danych związaną ze sklepem internetowym, pełen opis znajduję się w kodzie poniżej
//  Wypracuj obiekt charakteryzujący przedmiot
//  Wypracuj obiekt charakteryzujący koszyk
var CartItem = /** @class */ (function () {
    function CartItem(callName, category, price, discount) {
        this.callName = callName;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.uuid = Math.random();
    }
    CartItem.changeCartItemParameters = function (parameter, newValueOfParameter) {
        if (parameter !== 'callName' &&
            parameter !== 'category' &&
            parameter !== 'price' &&
            parameter !== 'discount') {
            return;
        }
        this[parameter] = newValueOfParameter;
    };
    return CartItem;
}());
var Cart = /** @class */ (function () {
    //
    //
    //
    // Dawać pusty konstruktor?
    //
    //
    function Cart() {
        // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
        // Ma umożliwiać:
        // - dodawanie/usuwanie przedmiotów do/z koszyka
        // - zmianę ilości produktu w koszyku
        // - podliczać wartość koszyka uwzględniajac rabaty
        this.uuid = Math.random();
        this.itemsInCart = [];
        this.discountCode = false;
    }
    Cart.prototype.addItemsToCart = function (callName, category, price, discount) {
        var itemToAdd = new CartItem(callName, category, price, discount);
        this.itemsInCart.push({ itemInCart: itemToAdd, quantity: 1 });
    };
    Cart.prototype.findItemUuid = function (nameOfItem) {
        var reg = new RegExp(nameOfItem);
        for (var i = 0; i < this.itemsInCart.length; i++) {
            if (reg.test(this.itemsInCart[i].itemInCart.callName)) {
                return this.itemsInCart[i].itemInCart.uuid;
            }
        }
    };
    Cart.prototype.removeItemsFromCart = function (uuid) {
        for (var i = 0; i < this.itemsInCart.length; i++) {
            var itemFound = this.itemsInCart.find(function (el) { return el.itemInCart.uuid === uuid; });
            if (itemFound) {
                var indexOfContact = this.itemsInCart.indexOf(itemFound);
                if (this.itemsInCart[indexOfContact].quantity === 1) {
                    this.itemsInCart.splice(indexOfContact, 1);
                }
                else {
                    this.itemsInCart[indexOfContact].quantity =
                        this.itemsInCart[indexOfContact].quantity - 1;
                }
            }
        }
    };
    Cart.prototype.updateQuantityOfItem = function (uuid, newQuantity) {
        for (var i = 0; i < this.itemsInCart.length; i++) {
            var itemFound = this.itemsInCart.find(function (el) { return el.itemInCart.uuid === uuid; });
            if (itemFound) {
                var indexOfContact = this.itemsInCart.indexOf(itemFound);
                this.itemsInCart[indexOfContact].quantity === newQuantity;
            }
        }
    };
    Cart.prototype.countTotal = function () {
        var finalValue = 0;
        for (var i = 0; i < this.itemsInCart.length; i++) {
            var priceOfItems = this.itemsInCart[i].quantity *
                this.itemsInCart[i].itemInCart.price *
                this.itemsInCart[i].itemInCart.discount;
            finalValue += priceOfItems;
        }
        if (this.discountCode) {
            finalValue = finalValue * this.discountForCart;
        }
        return finalValue;
    };
    return Cart;
}());
