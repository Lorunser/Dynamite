const moves = require('./moves').moves;

module.exports.Round = class Round{
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