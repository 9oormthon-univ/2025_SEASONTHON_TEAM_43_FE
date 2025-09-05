// context/AuthContext.tsx
import { AuthContextType } from "../remote/response/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { loginKakao, logout as logoutKakao } from "../remote/request/auth";
import { KakaoLoginRequest, KakaoLoginResponse } from "../remote/response/auth";

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  loading: true,
  isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const login = async (accessToken: string) => {
    try {
      setLoading(true);
      // const body: KakaoLoginRequest = { accessToken };
      const res: KakaoLoginResponse = await loginKakao(accessToken);

      console.log("서버 로그인 응답:", res);

      await Promise.all([
        SecureStore.setItemAsync("accessToken", res.accessToken),
      ]);
    } catch (err) {
      if (__DEV__) {
        console.error("로그인 실패:", err);
      }
      Alert.alert("로그인 실패", "다시 시도해주세요.");
      throw err;
    } finally {
      setLoading(false);
      setIsAuthReady(true);
    }
  };

  const logout = async () => {
    try {
      await logoutKakao();
      await Promise.all([
        SecureStore.deleteItemAsync("accessToken"),
        SecureStore.deleteItemAsync("refreshToken"),
        AsyncStorage.removeItem("user"),
      ]);
    } catch (error) {
      if (__DEV__) {
        console.error("로그아웃 중 에러 발생:", error);
      }
      Alert.alert("로그아웃 실패", "다시 시도해주세요.");
    } finally {
      // 3) 로컬 스토리지 정리 (항상 수행)
      await Promise.allSettled([
        SecureStore.deleteItemAsync("accessToken"),
        SecureStore.deleteItemAsync("refreshToken"),
        AsyncStorage.removeItem("user"),
      ]);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
