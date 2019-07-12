const p1Name = 'learningBot';
const p2Name = 'randomBot';
const numRounds = 100000;

const bot1 = require('./' + p1Name);
const bot2 = require('./' + p2Name);


module.exports.simulate = function(bot1, bot2){
    let mockstate = {rounds: []};

    for(let i = 0; i < numRounds; i++){
        let move1 = bot1.makeMove(mockstate);
        let move2 = bot2.makeMove(mockstate);

        mockstate.rounds.push({
            p1: move1,
            p2: move2
        });
    }

    return bot1.relScore * 100 / numRounds;
}

let p1score = module.exports.simulate(bot1, bot2);
console.log(p1Name + ' ' + p1score + ' % against ' + p2Name + ' (played ' + numRounds + ')');
    