const { Console } = require("console-mpds");
const console = new Console();

class ResultView {

  static show(game) {
    for (let i = 0; i < game.results.length;  i++) {
      console.write(game.proposalsCombinations[i].getColors());
      console.writeln(` --> ${game.results[i].getBlacks()} blacks and ${game.results[i].getWhites()} whites`);
    }
  }
}

module.exports.ResultView = ResultView;