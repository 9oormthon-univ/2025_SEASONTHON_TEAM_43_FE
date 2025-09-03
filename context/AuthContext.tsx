import { AuthContextType } from "../remote/response/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { loginKakao, logout } from "../remote/request/auth";
import { KakaoLoginRequest, KakaoLoginResponse } from "../remote/response/auth";

export const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  loading: true,
  isAuthReady: false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //   const [user, setUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const login = async (accessToken: string) => {
    try {
      setLoading(true);
      const body: KakaoLoginRequest = { accessToken };
      const res: KakaoLoginResponse = await loginKakao(body);

      //   const userData: FullUser = {
      //     userId: res.result.userId,
      //     newUser: res.result.newUser
      //   };

      //   setUser(userData);

      await Promise.all([
        SecureStore.setItemAsync("accessToken", res.accessToken)
        // SecureStore.setItemAsync("refreshToken", res.result.refreshToken)
        // AsyncStorage.setItem("user", JSON.stringify(userData))
      ]);
    } catch (err) {
      if (__DEV__) {
        console.error("로그인 실패:", err);
      }
      Alert.alert("로그인 실패", "다시 시도해주세요.");
    } finally {
      setLoading(false);
      setIsAuthReady(true);
    }
  };

  const logout = async () => {
    try {
      await logout();
      //   setUser(null);
      await Promise.all([
        SecureStore.deleteItemAsync("accessToken"),
        SecureStore.deleteItemAsync("refreshToken"),
        AsyncStorage.removeItem("user")
      ]);
    } catch (error) {
      if (__DEV__) {
        console.error("로그아웃 중 에러 발생:", error);
      }
      Alert.alert("로그아웃 실패", "다시 시도해주세요.");
    }
  };

  //   useEffect(() => {
  //     loadUser();
  //   }, []);

  return <AuthContext.Provider value={{ login, logout, loading, isAuthReady }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
