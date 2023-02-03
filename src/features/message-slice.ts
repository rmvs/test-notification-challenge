import { MessageTypes } from "@/components/message"
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface MessageNotification {
    type: MessageTypes;
    data: string;
}

const initialState: { message?: MessageNotification } = { }

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        alert: (state, { payload }: PayloadAction<MessageNotification>) => {
            state.message = payload;
        },
    }
})


export const { alert } = messageSlice.actions;
export const messageState = (state: RootState) => state.messageData;

export default messageSlice.reducer;