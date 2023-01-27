import { configureStore } from '@reduxjs/toolkit';
import { ChatPublicReducer, ChatPrivateReducer } from './reducers/Chat.reducer';
export const store = configureStore({
  reducer: {
    chatPublicReducer: ChatPublicReducer,
    chatPrivateReducer: ChatPrivateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
