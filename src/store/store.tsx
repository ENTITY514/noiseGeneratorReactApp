import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NoiseSlice from "./reducers/noise.reducer";

const rootReducers = combineReducers({
    NoiseSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
                thunk: true,
            });
        },
        devTools: process.env.NODE_ENV !== 'production'
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']