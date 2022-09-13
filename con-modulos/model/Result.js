class Result {

    blacks = 0;
    whites = 0;

    constructor(secretCombination, proposalCombination) {
        for (let i = 0; i < secretCombination.length(); i++) {
            if (proposalCombination.contains(secretCombination.getColor(i), i)) {
                this.blacks++;
            }
            const color = secretCombination.getColor(i);
            if (proposalCombination.contains(color) && !proposalCombination.contains(color, i)) {
                this.whites++;
            }
        }
    }

    getBlacks() {
        return this.blacks;
    }

    getWhites() {
        return this.whites;
    }
}

module.exports.Result = Result;