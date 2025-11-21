import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVideoPlay: false,
  modalVideoLink: "",
};

const VideoModalSlice = createSlice({
  name: "videoModal",
  initialState,
  reducers: {
    setModalVideoPlay(state, action) {
      state.modalVideoPlay = action.payload;
    },
    setModalVideoLink(state, action) {
      state.modalVideoLink = action.payload;
    },
  },
});

export const { setModalVideoLink, setModalVideoPlay } = VideoModalSlice.actions;

export default VideoModalSlice.reducer;
