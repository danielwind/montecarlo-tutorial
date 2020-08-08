import Pocket from './Pocket'
export default class TableGame {
    
    private name: string

    constructor(name: string) { 
        this.name = name

    }

    getName():string {
        return this.name
    }

    spin():Pocket{
        return {} as Pocket
    }
}