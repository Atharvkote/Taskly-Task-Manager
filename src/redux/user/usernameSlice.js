import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    clearUsername(state) {
      state.username = ""; // Reset username to empty
    },
    appendToUsername(state, action) {
      state.username += action.payload; // Append payload to the current username
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername, clearUsername, appendToUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
