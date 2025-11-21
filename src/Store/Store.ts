import { configureStore } from "@reduxjs/toolkit";
import { commonApi } from "../Api/CommonApi";
import workshopSlice from "./Slices/WorkshopSlice";
import VideoModalSlice from "./Slices/VideoModalSlice";

export const Store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    workshops: workshopSlice,
    VideoModal: VideoModalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
