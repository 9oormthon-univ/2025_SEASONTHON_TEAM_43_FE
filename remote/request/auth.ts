// remote/request/auth.ts
import {
  KakaoLoginRequest,
  KakaoLoginResponse,
  LogoutResponse,
} from "../response/auth";
import { axiosInstance } from "../axios";

export const loginKakao = async (
  kakaoAccessToken: string,
): Promise<KakaoLoginResponse> => {
  try {
    const { data } = await axiosInstance.post(
      "/api/kakao/login-bread",
      {},
      {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
          skipAuth: true,
        },
      },
    );
    return data;
  } catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("headers:", e?.config?.headers);
    console.log("sent data:", e?.config?.data); // 실제 전송 바디
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data); // 서버가 준 에러 메시지
    throw e;
  }
};

export const logout = async (
  kakaoAccessToken: string,
): Promise<LogoutResponse> => {
  const { data } = await axiosInstance.post(
    "/api/kakao/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
        skipAuth: true,
      },
    },
  );
  return data;
};
