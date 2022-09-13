let { Combination } = require('./Combination');

class SecretCombination extends Combination {

    constructor() {
        super();
        do {
            let randomColor = this.COLORS[parseInt(Math.random() * this.COLORS.length)];
            if (!this.contains(randomColor)) {
                this.colors += randomColor;
            }
        } while (!this.hasValidLength());
        console.log(this.colors);
    }
}

module.exports.SecretCombination = SecretCombination;