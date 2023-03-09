// Odwzoruj przy pomocy canvasa podaną animacje - https://bouncingdvdlogo.com/
// Trzeba uwzględnić: odbijanie się od końcówek ekranu, zmiana koloru loga po odbiciu (kolory mają być generowane losowe).
// Dodaj licznik: odbić od ściany, odbić od krawędzi ekranu
// Dodaj możliwość zmiany szerokości i wysokości zdjęcia, szybkości poruszania się przy pomocy inputa typu "range"
// Licznik oraz ustawienia zdjęcia mają wyświetlać się w specjalnym modalu.

const canvas = document.getElementById('mainCanvas')! as HTMLCanvasElement;

let x;
let y;
let xspeed;
let yspeed;

function preparePlayground() {
  //   canvas.width = document.body.clientWidth;
  //   canvas.height = document.body.clientHeight;
  const ctx = canvas.getContext('2d');
  //   ctx.fillStyle = 'black';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   const img = new Image();
  //   const img = document.createElement('img');
  //   img.src = 'dvd_logo.png';
  //   console.log(img);

  //   ctx.fillStyle = 'blue';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  //   ctx.drawImage(image, x, y, width, height);
  //   ctx?.drawImage(
  //     img,
  //     Math.random() * window.innerWidth,
  //     Math.random() * window.innerHeight,
  //     img.width,
  //     img.height
  //   );

  //   img.onload = function () {
  //     ctx.drawImage(img, 0, 0, img.width * 0.4, img.height * 0.4);
  //   };

  //   ctx.drawImage(img, 100, 100, 256, 256);
}

class DvdLogo {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public color: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fill();
  }
}

preparePlayground();
const dvdLogo = new DvdLogo(10, 10, 100, 100, 'blue');
dvdLogo.draw();
// let x;
// let y;

// let xspeed;
// let yspeed;

// let dvd;

// let r, g, b;

// function preload() {
//   dvd = loadImage('dvd_logo.png');
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   x = random(width);
//   y = random(height);
//   xspeed = 10;
//   yspeed = 10;
//   pickColor();
// }

// function pickColor() {
//   r = random(100, 256);
//   g = random(100, 256);
//   b = random(100, 256);
// }

// function draw() {
//   background(0);
//   // rect(x, y, 80, 60);
//   // Draw the DVD logo
//   tint(r, g, b);
//   image(dvd, x, y);

//   x = x + xspeed;
//   y = y + yspeed;

//   if (x + dvd.width >= width) {
//     xspeed = -xspeed;
//     x = width - dvd.width;
//     pickColor();
//   } else if (x <= 0) {
//     xspeed = -xspeed;
//     x = 0;
//     pickColor();
//   }

//   if (y + dvd.height >= height) {
//     yspeed = -yspeed;
//     y = height - dvd.height;
//     pickColor();
//   } else if (y <= 0) {
//     yspeed = -yspeed;
//     y = 0;
//     pickColor();
//   }
// }
