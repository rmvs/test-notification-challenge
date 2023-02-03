import { restAPI } from "../rest";
import NotificationsAPI from "./notifications";

const notificationsAPI = new NotificationsAPI(restAPI);

export { notificationsAPI }