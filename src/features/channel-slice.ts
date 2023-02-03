import { Message } from "@/lib/models/message";
import { NotificationType } from "@/lib/models/notification";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelState {
    channels: { [ key: string ]: Message[] },
}

interface MessagePayloadAction {
    message: Message,
    channelType: NotificationType
}

const initialState: ChannelState = {
    channels: { }
 };

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        notify: (state, { payload }: PayloadAction<MessagePayloadAction>) => {
            if(!state.channels[payload.channelType]){                
                state.channels = { ...state.channels, [ payload.channelType ]: [] }
            }

            state.channels = { ...state.channels, ...{ [payload.channelType] : [...state.channels[payload.channelType], payload.message]} }
            
        },
    }
})

export const { notify } = channelSlice.actions;
export const channelState = (state: RootState) => state.channelData;

export default channelSlice.reducer;