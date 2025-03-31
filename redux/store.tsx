import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "./api/doctorApi";
import { patientApi } from "./api/patientApi";
import { adminApi } from "./api/adminApi";
import { commonApi } from "./api/commonApi";
import { hospitalApi } from "./api/hospitalApi";

const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      commonApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      adminApi.middleware,
      hospitalApi.middleware,
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
