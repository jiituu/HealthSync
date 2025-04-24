import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "./api/doctorApi";
import { patientApi } from "./api/patientApi";
import { adminApi } from "./api/adminApi";
import { commonApi } from "./api/commonApi";
import { hospitalApi } from "./api/hospitalApi";
import { blogApi } from "./api/blogApi";
import { chatApi } from "./api/chatApi";

const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      commonApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      adminApi.middleware,
      hospitalApi.middleware,
      blogApi.middleware,
      chatApi.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;