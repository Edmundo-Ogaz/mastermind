let { SecretCombination } = require('./SecretCombination');
let { Result } = require('./Result');

class Game {

    secretCombination;
    proposalsCombinations;
    results;

    constructor() {
        this.secretCombination = new SecretCombination();
        this.proposalsCombinations = [];
        this.results = [];
    }

    addProposalCombination(proposalCombination) {
        this.proposalsCombinations.push(proposalCombination);
        this.results.push(new Result(this.secretCombination, proposalCombination));        
    }

    getAttempts() {
        return this.proposalsCombinations.length;
    }

    isEndGame() {
        return (this.isWinner() || this.isLoser());
    }

    isWinner() {
        const lastProposalCombination = this.proposalsCombinations[this.proposalsCombinations.length - 1];
        return this.secretCombination.colors === lastProposalCombination.colors
    }

    isLoser() {
        const MAX_ATTEMPTS = 10;
        return this.proposalsCombinations.length === MAX_ATTEMPTS;
    }

    getResults() {
        return this.results;
    }
}

module.exports.Game = Game;