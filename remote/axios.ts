import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL
});

// 요청 인터셉터: accessToken 붙이기
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");

    if (accessToken && !config.headers?.skipAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 그대로 에러 반환
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 여기서는 단순히 에러를 넘김
    return Promise.reject(error);
  }
);
