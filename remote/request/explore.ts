// remote/request/explore.ts
import { ExploreRequest, ExploreResponse } from "../response/explore";
import { axiosInstance } from "../axios";
import type { AxiosRequestConfig } from "axios";

export const getRecommendList = async (
  params: ExploreRequest,
  config?: AxiosRequestConfig,
): Promise<ExploreResponse> => {
  try {
    const { data } = await axiosInstance.get<ExploreResponse>(
      "/api/recommend/bakeries",
      {
        // GET은 body가 아니라 params!
        params,
        ...config,
      },
    );
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
