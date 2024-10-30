import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateState = {
  loading: false,
  success: false,
  error: null,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    updateStart(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    updateSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    updateError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetUpdate(state) {
      return initialState;
    },
  },
});

export const { updateStart, updateSuccess, updateError, resetUpdate } =
  updateSlice.actions;
export default updateSlice.reducer;
