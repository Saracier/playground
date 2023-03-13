// Odwzoruj przy pomocy canvasa podaną animacje - https://bouncingdvdlogo.com/
// Trzeba uwzględnić: odbijanie się od końcówek ekranu, zmiana koloru loga po odbiciu (kolory mają być generowane losowe).
// Dodaj licznik: odbić od ściany, odbić od krawędzi ekranu
// Dodaj możliwość zmiany szerokości i wysokości zdjęcia, szybkości poruszania się przy pomocy inputa typu "range"
// Licznik oraz ustawienia zdjęcia mają wyświetlać się w specjalnym modalu.

const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
const c = canvas.getContext('2d');
const speed = document.getElementById('speed');
const size = document.getElementById('size') as HTMLInputElement;
const velocity = document.getElementById!('speed') as HTMLInputElement;
const counter = document.getElementById('counter') as HTMLParagraphElement;

canvas.width = innerWidth;
canvas.height = innerHeight;

if (c === null) {
  throw new Error('cannot find canvas element on page');
}

function preparePlayground() {
  // No i czemu mam ten błąd, że c posibbly null, skoro linijka 17 pilnuje, żeby nigdy nie był null?
  c.fillStyle = 'black';
  c!.fillRect(0, 0, canvas.width, canvas.height);
}

class DvdLogo {
  color;
  counterWallBounce = 0;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public velocity: { x: number; y: number }
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = this.changeColor();
    this.velocity = velocity;
  }

  draw() {
    c!.fillStyle = this.color;
    c!.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    if (this.x + this.width > canvas.width || this.x <= 0) {
      this.velocity.x = -this.velocity.x;
      this.bounceWall();
    }
    if (this.y + this.height > canvas.height || this.y <= 0) {
      this.velocity.y = -this.velocity.y;
      this.bounceWall();
    }
  }
  changeColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  bounceWall() {
    this.color = this.changeColor();
    this.counterWallBounce++;
    counter.innerText = `Had bumped into wall ${this.counterWallBounce} times`;
  }
}

function animate() {
  requestAnimationFrame(animate);
  preparePlayground();
  dvdLogo.update();
}

function updateDVD() {
  dvdLogo = new DvdLogo(20, 20, +size.value, +size.value, {
    x: +velocity.value,
    y: +velocity.value,
  });
}

let dvdLogo: DvdLogo;
updateDVD();
preparePlayground();
animate();
