const moves = {
    rock: "R",
    paper: "P",
    scissors: "S",
    dynamite: "D",
    water: "W"
}


class Round{
    // -1 loss, 0 draw, +1 win
    static score(jsonRound){
        let myMove = jsonRound.p1;
        let opponentMove = jsonRound.p2;

        //draw
        if(myMove === opponentMove){
            return 0;
        }

        //my dynamite
        if(myMove === moves.dynamite){
            if(opponentMove === moves.water){
                return -1;
            }
            return +1;
        }

        //water
        if(myMove === moves.water){
            if(opponentMove === moves.dynamite){
                return +1;
            }
            return -1;
        }

        //any other rock paper scissors
        if(myMove === moves.rock && opponentMove ){
            return 0;
        }
    }
}


class Bot {
    "R P S D W"

    constructor(){
        this.myDynamiteCount = 100;
        this.opponentDynamiteCount = 100;
        this.score = 0;
        this.roundsPlayed = 0;
    }

    updateWinCount(lastRound){
        let myMove = lastRound.p1;
        let opponentMove = lastRound.p2;
    }

    randomInt(intMax){
        return Math.floor(Math.random() * intMax);
    }

    randomMove(){
        let keys = Object.keys(moves);
        let i = randomInt(keys.length);
        return keys[i];
    }

    updateState(gamestate){
        let rounds = gamestate.rounds;
        let lastRoundIndex = gamestate.rounds.length - 1;
        let lastRound = rounds[lastRoundIndex];

        if (lastRound.p1 === moves.dynamite){
            this.opponentDynamiteCount == this.opponentDynamiteCount - 1;
        }

        if()
    }

    makeMove(gamestate) {
        return this.randomMove;
    }
}

module.exports = new Bot();
