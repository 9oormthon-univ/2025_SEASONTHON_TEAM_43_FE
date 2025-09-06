import { MapListRequest, MapListResponse } from "../response/maplist";
import { axiosInstance } from "../axios";
import type { AxiosRequestConfig } from "axios";

export const getMapList = async (
  body: MapListRequest,
  config?: AxiosRequestConfig,
): Promise<MapListResponse> => {
  try {
    const { data } = await axiosInstance.post<MapListResponse>(
      "/api/bakery/list",
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
