// remote/request/auth.ts
import { KakaoLoginRequest, KakaoLoginResponse, LogoutResponse } from "../response/auth";
import { axiosInstance } from "../axios";

export const loginKakao = async (body: KakaoLoginRequest): Promise<KakaoLoginResponse> => {
  try {
    const { data } = await axiosInstance.post("/api/kakao/login", body, { headers: { skipAuth: true } });
    return data;
  } catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("sent data:", e?.config?.data); // 실제 전송 바디
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data); // 서버가 준 에러 메시지
    throw e;
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post("/api/kakao/logout");
  return data;
};
