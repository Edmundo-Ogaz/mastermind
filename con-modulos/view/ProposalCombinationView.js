const { Console } = require("console-mpds");
const console = new Console();

let { ProposalCombination } = require('../model/ProposalCombination');

class ProposalCombinationView {
  
  static read() {
    let error;
    let proposalCombination;
    do {
        let response = console.readString(`Propon una combinacion:`);
        proposalCombination = new ProposalCombination(response)
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
  }
}

module.exports.ProposalCombinationView = ProposalCombinationView;