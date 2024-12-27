import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = ""; // Reset email to empty
    },
    validateEmail(state) {
      // Simple email validation (improves readability)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.email)) {
        console.error("Invalid email format");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, clearEmail, validateEmail } = emailSlice.actions;

export default emailSlice.reducer;
