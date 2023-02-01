import { EmailStrategy, PushNotificationStrategy, SMSStrategy } from "../business";
import { Finance, Movies, Sports } from "../models";
import ChannelService from "./channel-service";


const channelService = new ChannelService();

export { channelService };