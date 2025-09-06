// remote/request/explore.ts
import axios from "axios";
import { ExploreRequest, ExploreResponse } from "../response/explore";
import type { AxiosRequestConfig } from "axios";

export const getRecommendList = async (
  params: ExploreRequest,
  config?: AxiosRequestConfig,
): Promise<ExploreResponse> => {
  try {
    // 환경변수에서 전체 URL 가져오기
    const baseUrl = process.env.EXPO_PUBLIC_FASTAPI_BASE_URL;

    const { data } = await axios.get<ExploreResponse>(baseUrl!, {
      params, // lat, lng 자동 쿼리스트링 처리
      ...config,
    });

    console.log(data);
    return data;
  } catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("headers:", e?.config?.headers);
    console.log("sent params:", e?.config?.params);
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data);
    throw e;
  }
};
