import { CategoryType } from "@/lib/models";
import { Message } from "@/lib/models/message";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChannelState {
    messages: { [key in CategoryType]? : Message[] },
}

interface MessagePayloadAction {
    message: Message,
}

const initialState: ChannelState = {
    messages: { }
 };

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        push: (state, { payload: { message } }: PayloadAction<MessagePayloadAction>) => {
            if(!(message.type in state.messages)){
                state.messages = { [message.type]: [] }
            }
            state.messages[message.type] = [...state.messages[message.type]!!, message]
        },
        clear: (state, { payload }: PayloadAction<CategoryType>) => {
            state.messages = { [payload]: [] }
        }
    }
})

export const { push, clear } = channelSlice.actions;
export const channelState = (state: RootState) => state.channelData;

export default channelSlice.reducer;