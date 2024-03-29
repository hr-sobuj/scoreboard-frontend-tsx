import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../features/authSlice";
import { scoreApi } from "../services/scoreService";

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const rootReducer = combineReducers({
    auth: authReducer,
    [scoreApi.reducerPath]: scoreApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(scoreApi.middleware),
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);