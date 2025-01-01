// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage by default
import userReducer from './user/userSlice'; // Your user reducer

// Configure redux-persist
const persistConfig = {
  key: 'root', // The key for localStorage
  storage, // Choose the storage type (localStorage or sessionStorage)
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Create the store with persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
