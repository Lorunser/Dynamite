const p1Name = 'parametrisedBot';
const p2Name = 'randomBot';
const numRounds = 50;

const bot1 = require('./' + p1Name).Bot;
const bot2 = require('./' + p2Name).Bot;


module.exports.simulate = function(Bot1, Bot2){
    let winCount = 0;

    for(let i = 0; i < numRounds; i++){
        let bot1 = new Bot1();
        let bot2 = new Bot2();
        let bot1state = {rounds: []};
        let bot2state = {rounds: []};

        for(let j = 0; j < 2500; j++){
            let move1 = bot1.makeMove(bot1state);
            let move2 = bot2.makeMove(bot2state);

            bot1state.rounds.push({
                p1: move1,
                p2: move2
            });

            bot2state.rounds.push({
                p1: move2,
                p2: move1
            });
        }
        
        if(bot1.relScore > 0){
            //console.log(bot1.relScore);
            //console.log(bot2.relScore);
            //console.log('##############');
            winCount++;
        }
    }

    return winCount * 100 / numRounds;
}

function optimise(paramBot, randomBot){
    let bestDraws = {
        rock: 0,
        paper: 0,
        scissors: 0,
        water: 0,
        dynamite: 0
    };

    let bestScore = 0;
    
    for(let rps = 0; rps < 4; rps++){
        for(let w = 0; w < 3; w++){
            for(let d = 0; d < 4; d++){
                let testDraws = {
                    rock: rps,
                    paper: rps,
                    scissors: rps,
                    water: w,
                    dynamite: d
                }

                let winCount = 0;

                for(let i = 0; i < numRounds; i++){

                    let bot1 = new paramBot(testDraws);
                    let bot2 = new randomBot();
                    let bot1state = {rounds: []};
                    let bot2state = {rounds: []};

                    for(let j = 0; j < 1000; j++){
                        let move1 = bot1.makeMove(bot1state);
                        let move2 = bot2.makeMove(bot2state);

                        bot1state.rounds.push({
                            p1: move1,
                            p2: move2
                        });

                        bot2state.rounds.push({
                            p1: move2,
                            p2: move1
                        });
                    }
                    
                    if(bot1.relScore > 0){
                        winCount++;
                    }
                }

                if(winCount > bestScore){
                    bestDraws = testDraws;
                }
            }
        }
    }

    console.log(bestDraws);
}

optimise(bot1, bot2);
//let p1score = module.exports.simulate(bot1, bot2);
//console.log(p1Name + ' wins ' + p1score + ' % against ' + p2Name + ' (played ' + numRounds + ' rounds)');
    