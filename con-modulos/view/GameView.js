const { Console } = require("console-mpds");
const console = new Console();

let { Game } = require('../model/Game');
let { ProposalCombinationView } = require('../view/ProposalCombinationView');
let { ResultView } = require('../view/ResultView');

class GameView {

  game;

  constructor() {
      this.game = new Game();
  }
  
  play() {
      console.writeln(`----- MASTERMIND -----`);
      do {
        console.writeln(`${this.game.getAttempts()} attempt(s):\n****`);
        let proposalCombination = ProposalCombinationView.read();
        this.game.addProposalCombination(proposalCombination);
        ResultView.show(this.game);
      } while (!this.game.isEndGame());
      console.writeln(this.game.isWinner() ? "Has ganado!!! ;-)" : "Has perdido!!! :-(");
  }
}

module.exports.GameView = GameView;