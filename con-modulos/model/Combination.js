
class Combination {
    
    colors = '';
    COLORS = "rgbycm";
    COMBINATION_LENGTH = 4;

    constructor() {}

    length() {
        return this.colors.length;
    }

    getColor(index) {
        return this.colors[index];
    }

    getColors() {
        return this.colors;
    }

    contains(color, index) {
        if (arguments.length == 2) {
            return this.colors[index] === color;
        }
        for (let i = 0; i < this.colors.length; i++) {
            if (this.contains(color, i)) {
                return true;
            }
        }
        return false;
    }

    hasValidLength() {
        return this.colors.length === this.COMBINATION_LENGTH;
    }

    hasValidColors() {
        const gameColors = new Combination();
        gameColors.setColors(this.COLORS);
        let hasValidColors = true;
        for (let i = 0; i < this.colors.length; i++) {
            hasValidColors &= gameColors.contains(this.colors[i]);
        }
        return hasValidColors;
    }

    hasRepeatedColors() {
        let hasRepeatedColors = false;
        for (let i = 0; i < this.colors.length; i++) {
            for (let j = 0; j < this.colors.length; j++) {
                if (this.colors[i] === this.colors[j] && i !== j) {
                    hasRepeatedColors = true;
                }
            }
        }
        return hasRepeatedColors;
    }

    setColors(colors) {
        this.colors = colors;
    }
}
    
module.exports.Combination = Combination;