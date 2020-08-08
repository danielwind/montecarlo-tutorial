import TableGame from '../game/TableGame'
import Bet from './../utils/Bet'
import Pocket from '../game/Pocket'
import BetType from '../game/BetType'
import Plot from '../utils/Plot'
import Output from '../utils/Output'

export default class Montecarlo {

    private bet:Bet
    private rounds:number = 0
    private simulations:number = 0
    private initialAmount:number = 0
    private game: TableGame

    constructor(game:TableGame, bet:Bet, rounds:number, simulations:number, initialAmount: number){
        this.game = game
        this.bet = bet
        this.rounds = rounds
        this.simulations = simulations
        this.initialAmount = initialAmount
    }

    sample():Output{

        let simulationBalances: Array<number> = []
        let plotData: Array<Plot> = []

        for (let index = 0; index < this.simulations; index++) {
            
            let balance = this.initialAmount
            let balancePerIteration:Array<number> = []

            for(let i = 0; i < this.rounds; i++){
                const result = this.game.spin()
                const playerHasWon = this.isWinner(result)
                balance = balance + this.bet.getAmount() * (playerHasWon ?  1 : -1)
                balancePerIteration.push(balance)
            }

            //save plot data for each simulation!
            plotData.push({ name: 'simulation '+ (index + 1), data: balancePerIteration })

            //store the final simulation iteration balance
            simulationBalances.push(balance)
        }
        
        //once all simulations have been run, let's take the average balance
        const averageBalance = (simulationBalances.reduce((a, b) => a + b , 0)) / (simulationBalances.length)
 
        return { average : averageBalance, data: plotData }
    }

    isWinner(result:Pocket):boolean {
        if(result){
            const betInfo = this.bet.getInfo()
            if(betInfo.type === BetType.BET_ON_COLOR){
                console.log(`Player ${betInfo.color === result.color ? 'WON': 'LOSS'}`)
                return betInfo.color === result.color
            } else {
                //TODO: Support for other bet types!
            }
        }
        return false
    }

    printInfo():void {
        console.log(`Montecarlo Class Information: ${JSON.stringify({rounds: this.rounds, game: this.game, bet: this.bet})}`)
    }
}