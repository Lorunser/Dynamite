const moves = {
    rock: "R",
    paper: "P",
    scissors: "S",
    water: "W",
    dynamite: "D"
};

const result = {
    win: 1,
    draw: 0,
    loss: -1
};


class MovesTracker{
    constructor(){
        this.rock = 0;
        this.paper = 0;
        this.scissors = 0;
        this.water = 0;
        this.dynamite = 0;
    }
}

class Round{
    // -1 loss, 0 draw, +1 win
    static score(jsonRound){
        let myMove = jsonRound.p1;
        let theirMove = jsonRound.p2;

        //same
        if(myMove === theirMove){
            return 0;
        }

        //my dynamite
        if(myMove === moves.dynamite){
            if(theirMove === moves.water){
                return -1;
            }
            return 1;
        }

        //their dynamite
        if(theirMove === moves.dynamite){
            if(myMove === moves.water){
                return 1;
            }
            return -1;
        }

        //my water
        if(myMove === moves.water){
            if(theirMove === moves.dynamite){
                return 1;
            }
            return -1;
        }

        //their water
        if(theirMove === moves.water){
            if(myMove === moves.dynamite){
                return -1;
            }
            return 1;
        }

        //only left to deal with rock paper scissors win or lose

        //my rock
        if(myMove === moves.rock){
            if(theirMove === moves.scissors){
                return 1;
            }
            return -1;
        }

        //my scissors
        if(myMove === moves.scissors){
            if(theirMove === moves.paper){
                return 1;
            }
            return -1;
        }

        //my paper
        if(myMove === moves.paper){
            if(theirMove === moves.rock){
                return 1;
            }
            return -1;
        }
    }
}


class Random{
    static int(intMax){
        return Math.floor(Math.random() * intMax);
    }

    static move(availableMoves){
        let keys = Object.keys(availableMoves);
        let i = Random.int(keys.length);
        let key = keys[i];
        let move = availableMoves[key];
        return move;
    }
}


class Bot1 {

    constructor(){
        this.myDynamiteCount = 100;
        this.opponentDynamiteCount = 100;
        this.score = 0;
        this.roundsPlayed = 0;
        this.roundValue = 1;

        this.availableMoves = {
            rock: "R",
            paper: "P",
            scissors: "S",
            water: "W",
            dynamite: "D"
        };
    }

    randomInt(intMax){
        return Math.floor(Math.random() * intMax);
    }

    randomMove(){
        let keys = Object.keys(this.availableMoves);
        let i = this.randomInt(keys.length);
        let key = keys[i];
        let move = this.availableMoves[key];
        return move;
    }

    updateState(gamestate){
        if(this.roundsPlayed > 0){
            let rounds = gamestate.rounds;
            let lastRound = rounds[this.roundsPlayed - 1];

            if (lastRound.p1 === moves.dynamite){
                this.myDynamiteCount--;
                
                if(this.myDynamiteCount === 0){
                    delete this.availableMoves.dynamite;
                }
            }

            if(lastRound.p2 === moves.dynamite){
                this.opponentDynamiteCount--;

                if(this.opponentDynamiteCount === 0){
                    delete this.availableMoves.water;
                }
            }

            let roundScore = Round.score(lastRound);
            if(roundScore === result.draw){
                this.roundValue++;
            }
            else{
                this.score = this.score + roundScore * this.roundValue;
                this.roundValue = 1;
            }
        }        

        this.roundsPlayed++; 
    }

    makeMove(gamestate) {
        this.updateState(gamestate)
        let move = Random.move(this.availableMoves);
        return move;
    }
}

module.exports = new Bot1();
