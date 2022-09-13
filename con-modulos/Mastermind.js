const { Console } = require("console-mpds");
const console = new Console();

let { GameView } = require('./view/GameView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Mastermind {
    
    static play() {
        const continueDialogView = new YesNoDialogView(`¿Quieres jugar otra partida? `);
        do {
            new GameView().play();
            continueDialogView.read();
        } while (continueDialogView.isAffirmative());
    }
}

module.exports.Mastermind = Mastermind;