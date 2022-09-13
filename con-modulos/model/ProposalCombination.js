const { Combination } = require("./Combination")

class ProposalCombination extends Combination {

    constructor(colors) {
        super();
        this.colors = colors
    }

}

module.exports.ProposalCombination = ProposalCombination;