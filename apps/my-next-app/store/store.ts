// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
// import { RootState } from './types'; // Create this file for type definitions

const store = configureStore({
  reducer: rootReducer,
});

// Export the types for RootState
export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

export default store;
