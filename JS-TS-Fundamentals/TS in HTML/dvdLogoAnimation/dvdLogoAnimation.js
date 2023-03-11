"use strict";
// Odwzoruj przy pomocy canvasa podaną animacje - https://bouncingdvdlogo.com/
// Trzeba uwzględnić: odbijanie się od końcówek ekranu, zmiana koloru loga po odbiciu (kolory mają być generowane losowe).
// Dodaj licznik: odbić od ściany, odbić od krawędzi ekranu
// Dodaj możliwość zmiany szerokości i wysokości zdjęcia, szybkości poruszania się przy pomocy inputa typu "range"
// Licznik oraz ustawienia zdjęcia mają wyświetlać się w specjalnym modalu.
const canvas = document.getElementById('mainCanvas');
const c = canvas.getContext('2d');
const speed = document.getElementById('speed');
const size = document.getElementById('size');
const velocity = document.getElementById('speed');
const counter = document.getElementById('counter');
canvas.width = innerWidth;
canvas.height = innerHeight;
function preparePlayground() {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
}
class DvdLogo {
    constructor(x, y, width, height, velocity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.counterWallBounce = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = this.changeColor();
        this.velocity = velocity;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
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
let dvdLogo;
updateDVD();
preparePlayground();
animate();
