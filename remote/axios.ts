import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

// 모든 요청 → kakaoAccessToken 붙이기
axiosInstance.interceptors.request.use(
  async (config) => {
    const kakaoAccessToken = await SecureStore.getItemAsync("kakaoAccessToken");

    if (kakaoAccessToken && !config.headers?.skipAuth) {
      config.headers.Authorization = `Bearer ${kakaoAccessToken}`;
    }
    if (config.headers?.skipAuth) {
      delete config.headers.skipAuth;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 그대로 에러 반환
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 여기서는 단순히 에러를 넘김
    return Promise.reject(error);
  },
);
