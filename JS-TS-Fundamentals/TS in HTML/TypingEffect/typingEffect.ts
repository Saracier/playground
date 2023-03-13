// Twoim zadaniem jest odtworzyć efekt wizualny pisania, na podstawie biblioteki: https://mattboldt.com/demos/typed-js/
// Instancja klasy Typed:
// ma pozwalać na wskazanie elementu html, w którym aktualny tekst zawarty w elemencie zostanie zdobiony tym elementem.
// ma tworzyć za wskazanym elementem, mrugająca, pionową linię symulującą kursor,
// ma pozwalać na wsazanie czy pisane mają być wyrazy czy litery,
// ma pozwalać na wskazanie tempa pisania w ilościach liter na minutę (defaultowo 120/min)

// var typed = new Typed('.element', {
//     strings: ["First sentence.", "Second sentence."],
//     typeSpeed: 30
//   });

type TOptionsObject = {
  strings: string[];
  typespeed: number;
};

class Typed {
  editedHtmlElement: HTMLElement;
  options: TOptionsObject = { strings: [], typespeed: 100 };

  constructor(element: string, options: TOptionsObject) {
    this.options.strings = options.strings;
    this.options.typespeed = options.typespeed;
    const htmlElement = document.querySelector(element) as HTMLElement;
    if (htmlElement === null) {
      throw new Error('cannot find such element');
    }
    this.editedHtmlElement = htmlElement;
    this.addPipe(element);
  }

  addPipe(element: string) {
    let styleElem = document.head.appendChild(document.createElement('style'));
    console.log(this.editedHtmlElement);
    styleElem.innerHTML = `${element}::after {
  content: "|";
  animation-name: pipe-show-hide;
  animation-duration: 1s;
  animation-iteration-count: infinite
}

@keyframes pipe-show-hide {
  0% {
    opacity: 0%
}
40% {
    opacity: 100%
}
70% {
    opacity: 100%
}
100% {
    opacity: 0%
}
}`;
  }

  printText() {
    this.options.strings.forEach((element) => {
      const currentText = element.split('');
      // currentText.reduce((acc, el) => {
      //   acc = acc + el.toString();
      //   this.editedHtmlElement.textContent = acc;
      //   setTimeout(() => {
      //     return acc;
      //   }, this.options.typespeed);

      //   return 'heloo';
      // });
      setTimeout(() => {
        this.printAnotherLetter(currentText);
      }, 1000 / this.options.typespeed);
    });
  }

  printAnotherLetter(currentText: string[]) {
    setTimeout(() => {
      if (currentText.length > 0) {
        let letter = currentText.shift();
        if (letter === undefined) {
          letter = ' ';
        }
        if (this.editedHtmlElement.textContent === null) {
          this.editedHtmlElement.textContent = letter;
        } else {
          this.editedHtmlElement.textContent =
            this.editedHtmlElement.textContent + letter;
        }
        this.printAnotherLetter(currentText);
      }
    }, 1000 / this.options.typespeed);
  }

  // printText() {
  //   this.options.strings.forEach((element) => {
  //     const currentText = element.split('');
  //     this.addAnotherLetter(currentText)
  //   });
  // }

  // async addAnotherLetter(currentText: string[]) {
  //   new Promise( (resolve, reject) => {
  //     const returnValue = currentText.reduce(async (acc, el) => {
  //       acc = await acc + el.toString();
  //       this.editedHtmlElement.textContent = acc;
  //       setTimeout(() => {
  //         return acc;
  //       }, this.options.typespeed);

  //       return 'heloo';
  //     });
  //     resolve(returnValue)
  //   })

  // }
}

let hello = new Typed('#testElement', {
  strings: [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis fugit beatae deleniti fugiat unde delectus illo excepturi saepe veniam eligendi iusto, minus eaque consectetur assumenda expedita quam, voluptatibus earum non! Corporis, perferendis magni! Cupiditate laudantium dolor recusandae sequi fugit nisi dolorum alias molestiae quasi quae voluptates amet, quisquam soluta vero quos architecto. Fuga, reiciendis maiores nesciunt voluptatum fugiat suscipit, unde quas velit corrupti adipisci laudantium iste totam quam itaque deleniti saepe. Distinctio aperiam molestias nostrum, velit a asperiores provident, qui rem cupiditate reiciendis dolorum ducimus! Itaque dicta debitis nulla laborum doloribus modi at, similique nisi velit labore assumenda distinctio animi!',
  ],
  typespeed: 1,
});

// hello.addPipe();
// hello.printText();
