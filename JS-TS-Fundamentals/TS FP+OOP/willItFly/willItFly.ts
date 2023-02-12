// Cele główne
//  Potrzebne jest narzędzie, które sprawdzi czy wykonywane loty są opłacalne, i czy da sie je odbyć bez międzylądowania (w celach tankowania).
//  Warunki przyjęte w ramach zadania:
// minimum do odbycia lotu to 50% obłożenia najniższej klasy występującej w samolocie
// najniższa klasa zajmuje 80% miejsc w samolocie
// odległość liczymy od lotniska do lotniska w linii prostej
//  Stałe przyjęte do zadania:
// cena biletu klasy ekonomicznej - 300 zł
// cena biletu klasy biznes - 2x ekonomiczna
// cena biletu pierwszej klasy - 3x ekonomiczna
// przyjęte spalanie: 3L / pasażer / 100 km
// średnia cena paliwa lotniczego - 7 zł/L
// cena za każdą sztuke bagażu - 100 zł
// rodzaje pogody: dobra (spalanie standardowe), wiatr (+10% do spalania) i burza (+20% do spalania)

enum ClassPicked {
  numberEconomic,
  numberBusiness,
  numberFirst,
}

enum Weather {
  good,
  wind,
  storm,
}

interface IPlane {
  id: string;
  numberEconomic: number;
  numberBusiness: number;
  numberFirst: number;
  tankCapacity: number;
}

interface IPassenger {
  id: string;
  classPicked: ClassPicked;
  quantityPaidLuggage: number;
}

interface IFLight {
  id: string;
  plane: Plane;
  economic: Passenger[];
  business: Passenger[];
  first: Passenger[];
  weather: Weather;
  airportTakeoff: string;
  airportLanding: string;
  distance: number;
}

class Plane implements IPlane {
  // Ma mieć: id, ilość miejsc w poszczególnych klasach i pojemność baku

  constructor(
    public id: string,
    public numberEconomic: number,
    public numberBusiness: number,
    public numberFirst: number,
    public tankCapacity: number
  ) {}
}

class Passenger implements IPassenger {
  // Ma mieć: id, wybrana klasa, ilość płatnego bagażu (max 2 sztuki)
  quantityPaidLuggage: number;
  constructor(
    public id: string,
    public classPicked: ClassPicked,
    quantityPaidLuggage: number
  ) {
    if (quantityPaidLuggage > 2) {
      throw new Error(
        'You can have only two paid luggages on a single ticket.'
      );
    }
    this.quantityPaidLuggage = quantityPaidLuggage;
  }
}

class Flight implements IFLight {
  // Ma mieć: id, samolot, ilość pasażerów w każdej klasie, pogoda, lotnisko wylotu i przylotu, dystans do przebycia
  constructor(
    public id: string,
    public plane: Plane,
    public economic: Passenger[],
    public business: Passenger[],
    public first: Passenger[],
    public weather: Weather,
    public airportTakeoff: string,
    public airportLanding: string,
    public distance: number
  ) {}

  countFuel() {
    const clientsQuantity =
      this.economic.length + this.business.length + this.first.length;
    let weatherBonus: number;
    switch (this.weather) {
      case Weather.good:
        weatherBonus = 1;
        break;
      case Weather.wind:
        weatherBonus = 1.1;
        break;
      case Weather.storm:
        weatherBonus = 1.2;
        break;
    }
    const totalFuel =
      (3 * clientsQuantity * weatherBonus * this.distance) / 100;
    return totalFuel;
  }

  countCost() {
    const totalFuel = this.countFuel();
    return 7 * totalFuel;
  }

  countIncome() {
    const ticketPrice = 300;
    const incomeEconomic = this.economic.length * ticketPrice;
    const incomeBusiness = this.business.length * ticketPrice * 2;
    const incomeFirst = this.first.length * ticketPrice * 3;
    let incomeLuggageEconomic = 0;
    this.economic.forEach(
      (el) => (incomeLuggageEconomic += el.quantityPaidLuggage * 100)
    );
    let incomeLuggageBusiness = 0;
    this.business.forEach(
      (el) => (incomeLuggageBusiness += el.quantityPaidLuggage * 100)
    );
    let incomeLuggageFirst = 0;
    this.first.forEach(
      (el) => (incomeLuggageFirst += el.quantityPaidLuggage * 100)
    );
    return (
      incomeEconomic +
      incomeBusiness +
      incomeFirst +
      incomeLuggageEconomic +
      incomeLuggageBusiness +
      incomeLuggageFirst
    );
  }

  isProfitable() {
    if (this.economic.length <= this.plane.numberEconomic * 0.5) {
      console.error('not enough people in economic places');
      return;
    }
    const income = this.countIncome();
    const cost = this.countCost();
    if (income > 3 * cost) {
      return true;
    }
    return false;
  }

  canFlyWithoutStopover() {
    const fuel = this.countFuel();
    if (this.plane.tankCapacity > fuel) {
      return true;
    }
    return false;
  }
}

// Ma umożliwić:
// - obliczenie paliwa koniecznego do odbycia lotu
// - sprawdzenie czy samolot może przelecieć bez międzylądowania
// - czy pokonanie tej trasy jest opłacalne, czyt. czy przychód jest ponad 3x większy niż koszt paliwa na trasie
