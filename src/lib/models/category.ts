export enum CategoryType {
    SPORTS="SPORTS",FINANCE="FINANCE",MOVIES="MOVIES"
}

export class Category {    
    constructor(private _type: CategoryType){

    }

    get type(): CategoryType {
        return this._type;
    }
    
}

export class Sports extends Category {
    constructor(){
        super(CategoryType.SPORTS)
    }
}

export class Finance extends Category {
    constructor(){
        super(CategoryType.FINANCE);
    }
}

export class Movies extends Category {
    constructor(){
        super(CategoryType.MOVIES);
    }
}