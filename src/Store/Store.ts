import { configureStore } from "@reduxjs/toolkit";
import { commonApi } from "../Api/CommonApi";
import workshopReducer from "./Slices/WorkshopSlice";

export const Store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    workshops: workshopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
