import { createSlice } from "@reduxjs/toolkit";

const workshopSlice = createSlice({
  name: "workshops",
  initialState: {
    AllWorkshop: [],
    workshopLoading: false,
  },
  reducers: {
    setWorkshops(state, action) {
      state.AllWorkshop = action.payload;
    },
    setworkshopLoading(state, action) {
      state.workshopLoading = action.payload;
    },
  },
});

export const { setWorkshops, setworkshopLoading } = workshopSlice.actions;
export default workshopSlice.reducer;
