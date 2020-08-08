import Color from "./Color"
import BetType from "../game/BetType"

interface BetInfo {
    type: BetType
    color: Color
    amount: number
    number?: number
}

export default class Bet {

    private type: BetType = BetType.NONE
    private color: Color = Color.NONE
    private number: number = -1
    private amount: number = 0
    
    constructor(config:BetInfo ){
        if(config.type === BetType.BET_ON_COLOR) {
            this.color = config.color
            this.amount = config.amount
            this.type = config.type
        }else {
            //TODO - Support the other bet types
        } 
    }

    getAmount(): number{
        return this.amount
    }

    getType(): BetType{
        return this.type
    }

    getInfo():BetInfo{
        const betInfo = { type: this.type, color: this.color, amount: this.amount }
        console.log(`Bet: ${JSON.stringify(betInfo)}`)
        return betInfo
    }
}