import { API_ENDPOINTS } from "@/lib/constants";

export default class NotificationsAPI {

    constructor(private rest: any){
        
    }

    post(data: any){
        return this.rest.post(API_ENDPOINTS.HISTORY,data);
    }

    getHistory(){
        return this.rest.get(API_ENDPOINTS.HISTORY);        
    }
}