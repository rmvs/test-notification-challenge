import uuid from "react-uuid";
import { CategoryType } from "./category";

export class Message {
    constructor(
        public type: CategoryType, 
        public message: string,
        public id: string = uuid()){

    }
}