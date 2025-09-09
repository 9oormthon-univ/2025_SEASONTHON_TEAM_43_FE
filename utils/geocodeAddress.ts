// lib/geocodeAddress.ts
import axios from "axios";

const REST_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

export type LatLng = { lat: number; lng: number };

export default async function geocodeAddress(address: string): Promise<LatLng> {
  if (!REST_KEY) throw new Error("Kakao REST API 키가 없습니다. EXPO_PUBLIC_KAKAO_REST_API_KEY 설정을 확인하세요.");
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `KakaoAK ${REST_KEY}` }
  });

  const doc = data?.documents?.[0];
  if (!doc) throw new Error("주소에 대한 좌표를 찾을 수 없습니다.");

  // Kakao: x=lng, y=lat (string)
  return { lat: parseFloat(doc.y), lng: parseFloat(doc.x) };
}
