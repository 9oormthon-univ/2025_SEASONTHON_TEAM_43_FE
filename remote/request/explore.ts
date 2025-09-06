import { ExploreRequest, ExploreResponse } from "../response/explore";
import { axiosInstance } from "../axios";
import type { AxiosRequestConfig } from "axios";

export const getRecommendList = async (
  body: ExploreRequest,
  config?: AxiosRequestConfig,
): Promise<ExploreResponse> => {
  try {
    const { data } = await axiosInstance.post<ExploreResponse>(
      "/api/recommend/bakeries",
      body,
      config,
    );
    return data;
  } catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("headers:", e?.config?.headers);
    console.log("sent data:", e?.config?.data);
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data);
    throw e;
  }
};
