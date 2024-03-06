import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import scoreReducer from "./reducer/scoreReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    version:1,
}

const rootReducer = combineReducers({
    auth: authReducer,
    score: scoreReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch