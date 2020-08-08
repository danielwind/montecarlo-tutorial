import TableGame from './TableGame'
import Style from './Style'
import AmericanLayout from './AmericanLayout'
import EuropeanLayout from './EuropeanLayout'
import Pocket from './Pocket'
import {randomInt} from 'mathjs'
const randojs = require('@nastyox/rando.js') 


export default class Roulette extends TableGame {

    private style: Style
    private layout: Array<Pocket>
    private range: Array<number>
    private enableCryptoPRNG:boolean = false

    constructor(style: Style, enableCryptoPRNG: boolean) {
        super('Roulette')
        this.style = style
        this.enableCryptoPRNG = enableCryptoPRNG
        this.layout = this.getLayout()
        this.range = this.getRange()
    }

    getLayout():Array<Pocket> {
        return this.style === Style.AMERICAN ?  AmericanLayout : EuropeanLayout
    }

    getRange():Array<number> {
        return [0, this.layout.length - 1]
    }

    spin():Pocket {
        let settle:number = this.getRandomNumber()
        let result = this.layout.find(pocket => pocket.number === settle) || {} as Pocket;
        console.log(`Roulette spin result: ${JSON.stringify(result)}`);
        return result
    }

    //we'll count green pocket!
    getRandomNumber():number {
        if(this.enableCryptoPRNG) {
            return randojs.rando(this.range[0], this.range[1]);
        } 
        return randomInt(this.range[0], this.range[1] + 1)
    }
}

