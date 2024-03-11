import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import scoreReducer from "../features/scoreSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { scoreApi } from "../services/scoreService";

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const rootReducer = combineReducers({
    auth: authReducer,
    score: scoreReducer,
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