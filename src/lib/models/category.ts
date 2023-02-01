import { Message } from "./message";
import { User } from "./user";

export class Category {    
    constructor(private id: string){

    }
    getID(): string {
        return this.id;        
    }
}

export class Sports extends Category {
    constructor(){
        super("SPORTS")
    }
}

export class Finance extends Category {
    constructor(){
        super("FINANCE");
    }
}

export class Movies extends Category {
    constructor(){
        super("MOVIES");
    }
}