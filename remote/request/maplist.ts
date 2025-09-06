// remote/request/maplist.ts
import { MapListRequest, MapListResponse } from "../response/maplist";
import { axiosInstance } from "../axios";
import type { AxiosRequestConfig } from "axios";

export const getMapList = async (
  params: MapListRequest,
  config?: AxiosRequestConfig,
): Promise<MapListResponse> => {
  const { lat, lng, radius, size } = params;

  try {
    const { data } = await axiosInstance.get<MapListResponse>(
      "/api/bakery/list",
      {
        ...(config ?? {}),
        params: {
          lat, // number OK (axios가 문자열로 직렬화)
          lng,
          ...(radius ? { radius } : {}),
          ...(size ? { size } : {}),
        },
        headers: {
          ...(config?.headers ?? {}),
          // 인증 건너뛰어야 하면 유지
          skipAuth: true,
        },
      },
    );
    return data;
  } catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("headers:", e?.config?.headers);
    console.log("query params:", e?.config?.params);
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data);
    throw e;
  }
};
