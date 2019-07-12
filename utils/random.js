const weights = {
    rock: 1,
    paper: 1,
    scissors: 1,
    water: 1,
    dynamite: 1
};


module.exports.Random = class Random{
    static int(intMax){
        return Math.floor(Math.random() * intMax);
    }


    static move(availableMoves, weights){
        let keys = Object.keys(availableMoves);

        let sumWeights = 0;
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            sumWeights
        }

        let i = Random.int(keys.length);
        let key = keys[i];
        let move = availableMoves[key];


        return move;
    }
}