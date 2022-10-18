import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api";

interface AuthActionParam {
  purpose: string;
  obj: formState;
}

export const auth = createAsyncThunk(
  "user/auth",
  async (
    { purpose, obj }: AuthActionParam,
    { fulfillWithValue, rejectWithValue }: any
  ) => {
    try {
      const { data } = await API.post(`/${purpose}`, obj);
      if (data.error) return rejectWithValue(data.error);
      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

interface UserState {
  data: any;
  status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  data: null,
  status: "idle",
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(auth.pending, (state: UserState) => {
      state.status = "pending";
    });
    builder.addCase(auth.fulfilled, (state: UserState, action: any) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(auth.rejected, (state: UserState, action: any) => {
      state.status = "failed";
      state.data = { message: action.payload };
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
