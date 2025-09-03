import { KakaoLoginRequest, KakaoLoginResponse, LogoutResponse } from "../response/auth";
import { axiosInstance } from "../axios";

export const loginKakao = async (body: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  const { data } = await axiosInstance.post("/api/kakao/login", body);
  return data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post("/api/kakao/logout");
  return data;
};
