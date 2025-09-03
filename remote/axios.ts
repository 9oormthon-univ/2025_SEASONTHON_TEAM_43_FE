import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { logout } from "./request/auth";

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

// 응답 인터셉터: 401 → 자동 로그아웃 + 로그인 화면 이동
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // 저장된 토큰 삭제
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");

        // AuthContext 로그아웃 함수 실행 (세션 정리)
        await logout?.();

        // 로그인 화면으로 이동
        router.replace("/(auth)/login");
      } catch (err) {
        if (__DEV__) {
          console.error("❌ 401 처리 중 오류:", err);
        }
      }
    }
    return Promise.reject(error);
  }
);
