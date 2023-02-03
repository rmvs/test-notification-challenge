import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { channelSlice, messageSlice } from './features';

export const store = configureStore({
    reducer: {
      channelData: channelSlice,
      messageData: messageSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;