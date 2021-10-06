import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";
import { messages } from "./message/store";

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

const createReducer = asyncReducers => (state, action) => {
    const combinedReducer = combineReducers({ main: main.reducer });

    return combinedReducer(state, action);
};

const store = configureStore({
    reducer: createReducer(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {},
        }),
    devTools: process.env.NODE_ENV === "development",
});

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
};

export const { changeDeviceKey, changeUserAddress } = main.actions;
export const selectDeviceKey = () => state => state.main.deviceKey;
export const selectUserAddress = () => state => state.main.userAddress;
export default store;
