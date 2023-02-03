import { save } from "@/features/users-slice";
import { useAppSelector } from "@/hooks";
import { store } from "@/store";
import { User } from "../../models";

export default class UserService {
    constructor() { }

    save(user: User){
        store.dispatch(save(user));
    }
}