import { SearchResponse } from "@/remote/response/search";
import { axiosInstance } from "../axios";
import type { AxiosRequestConfig } from "axios";

export type SearchRequest = {
  query: string;
  radius? : number; //거리
  size? : number;
  lat: number;
  lng: number;
};


export const searchBakeries = async (
	params: SearchRequest,
	config?: AxiosRequestConfig,
) : Promise<SearchResponse> => {
    const { query, radius, size, lat, lng } = params;
	try {
		const {data} = await axiosInstance.get<SearchResponse>(
			"/api/bakery/search",
			{
				...(config ?? {}),
				params: {
					query,
					...(radius ? { radius } : {}),
         		    ...(size ? { size } : {}),
					lat,
					lng,
				},
				headers: {
					...(config?.headers ?? {}),
					skipAuth: true,
				}
			}
		);
		return data;
	} catch (e: any) {
    console.log("url:", e?.config?.url, "method:", e?.config?.method);
    console.log("status:", e?.response?.status);
    console.log("resp data:", e?.response?.data);
    throw e;
  }
};