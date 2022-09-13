const { Console } = require("console-mpds");
const console = new Console();
initMastermind().init();

function initMastermind() {
  return {
    init: function () {
      const continueDialogView = initYesNoDialogView(`¿Quieres jugar otra partida? `);
      do {
        initGameView().play();
        continueDialogView.read();
      } while (continueDialogView.isAffirmative());
    }
  }
}

function initYesNoDialogView(question) {
  let answer = ``;
  return {
    read: function () {
      let error;
      do {
        answer = console.readString(question);
        error = !this.isAffirmative() && !this.isNegative();
        if (error) {
          console.writeln(`Por favor, responda "si" o "no"`);
        }
      } while (error);
    },
    isAffirmative: function () {
      return answer === `si`;
    },
    isNegative: function () {
      return answer === `no`;
    }
  }
}

function initGameView() {
  const game = initGame();
  return {
    play: function () {
      do {
        let attempts = game.getAttempts();
        console.writeln(`**** ${attempts + 1 } attempt(s) ****`);
        const proposalCombination = initProposalCombinationView().read();
        game.addProposalCombination(proposalCombination);
        initProposalCombinationView().show(game.getProposalCombination(attempts));
        initResultView().show(game.getResult(attempts));
      } while (!game.isEndGame())
      console.writeln(game.isWinner() ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
    }
  }
}

function initProposalCombinationView() {
  return {
    read: function () {
      let error;
      let proposalCombination = initProposalCombination();
      do {
        response = console.readString(`Propon una combinacion:`);
        proposalCombination.setColors(response);
        if (!proposalCombination.hasValidLength()) {
          console.writeln(`- La longitud de la combinacion es incorrecta!`);
        } else if (proposalCombination.hasRepeatedColors()) {
          console.writeln(`- Combinación propuesta incorrecta, al menos, un color está repetido.`);
        } else if (!proposalCombination.hasValidColors()) {
          console.writeln(`- Colores invalidos, los colores son" :${proposalCombination.COLORS}`);
        }
        error = !proposalCombination.hasValidLength() || !proposalCombination.hasValidColors() || proposalCombination.hasRepeatedColors();
      } while (error);
      return proposalCombination;
    },
    show: function (proposalCombination) {
      console.write(proposalCombination.getColors());
    }
  }
}

function initResultView() {
  return {
    show: function (result) {
      console.writeln(` --> ${result.getBlacks()} blacks and ${result.getWhites()} whites\n`);
    }
  }
}

function initGame() {
  const MAX_ATTEMPTS = 10;
  const secretCombination = initSecretCombination();
  let proposalsCombinations = [];
  let results = [];
  return {
    addProposalCombination: function (proposalCombination) {
      proposalsCombinations.push(proposalCombination);
      results.push(initResult(secretCombination, proposalCombination));
    },
    isEndGame: function () {
      return (this.isWinner() || this.isLoser());
    },
    isWinner: function () {
      const lastProposalCombination = proposalsCombinations[proposalsCombinations.length - 1];
      if (!lastProposalCombination)
        return false;
      return secretCombination.getColors() == lastProposalCombination.getColors();
    },
    isLoser: function () {
      return proposalsCombinations.length === MAX_ATTEMPTS;
    },
    getAttempts: function () {
      return proposalsCombinations.length;
    },
    getProposalCombination: function (index) {
      return proposalsCombinations[index];
    },
    getResult: function (index) {
      return results[index];
    }
  }
}

function initSecretCombination() {
  const combination = initCombination();
  do {
    let randomColor = combination.COLORS[parseInt(Math.random() * combination.COLORS.length)];
    if (!combination.contains(randomColor)) {
      combination.addColor(randomColor);
    }
  } while (!combination.hasValidLength());
  console.writeln(combination.getColors());
  return combination
}

function initProposalCombination() {
  const combination = initCombination();
  return combination
}


function initCombination() {
  let colors = '';
  const COLORS = "rgbycm";
  const COMBINATION_LENGTH = 4;
  return {
    COLORS,
    length: function () {
      return colors.length;
    },
    getColor: function (index) {
      return colors[index];
    },
    getColors: function () {
      return colors;
    },
    contains: function (color, index) {
      if (arguments.length == 2) {
        return colors[index] === color;
      }
      for (let i = 0; i < colors.length; i++) {
        if (this.contains(color, i)) {
          return true;
        }
      }
      return false;
    },
    hasValidLength: function () {
      return colors.length === COMBINATION_LENGTH;
    },
    hasValidColors: function () {
      const gameColors = initCombination();
      gameColors.setColors(COLORS);
      let hasValidColors = true;
      for (let i = 0; i < colors.length; i++) {
        hasValidColors &= gameColors.contains(colors[i]);
      }
      return hasValidColors;
    },
    hasRepeatedColors: function () {
      let hasRepeatedColors = false;
      for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < colors.length; j++) {
          if (colors[i] === colors[j] && i !== j) {
            hasRepeatedColors = true;
          }
        }
      }
      return hasRepeatedColors;
    },
    setColors: function (otherColors) {
      colors = otherColors;
    },
    addColor: function (otherColor) {
      colors += otherColor;
    }
  }
}

function initResult(secretCombination, proposalCombination) {
  let blacks = 0;
  let whites = 0;
  for (let i = 0; i < secretCombination.length(); i++) {
    if (proposalCombination.contains(secretCombination.getColor(i), i)) {
      blacks++;
    }
    const color = secretCombination.getColor(i);
    if (proposalCombination.contains(color) && !proposalCombination.contains(color, i)) {
      whites++;
    }
  }
  return {
    getBlacks: function () {
      return blacks;
    },
    getWhites: function () {
      return whites;
    }
  }
}