import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user.slice";
import categoryReducer from "./redux/category.slice"; // ✅ Import your category slice
import commentReducer from "./redux/coments.slice"; // ✅ Import your category slice
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  comment: commentReducer
});

// Persist config
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

// Wrap persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);
