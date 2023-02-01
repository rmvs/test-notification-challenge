import uuid from "react-uuid";
import { Category } from "./category";

export class Message {
    constructor(public category: Category, public message: string, public id: string = uuid()){

    }
}