import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

const main = createSlice({
  name: "main",
  initialState: { deviceKey: "", userAddress: "" },
  reducers: {
    changeDeviceKey: (state, action) => {
      state.deviceKey = action.payload.deviceKey;
    },
    changeUserAddress: (state, action) => {
      state.userAddress = action.payload.userAddress;
    },
  },
  extraReducers: {},
});

const combinedReducer = combineReducers({
  main: main.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {},
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const { changeDeviceKey, changeUserAddress } = main.actions;
export const selectDeviceKey = () => (state) => state.main.deviceKey;
export const selectUserAddress = () => (state) => state.main.userAddress;
export default store;
