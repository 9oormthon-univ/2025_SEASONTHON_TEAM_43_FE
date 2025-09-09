// remote/response/maplist.ts
export type MapListRequest = {
  lat: number;
  lng: number;
  radius?: string;
  size?: string;
};

// 단일 아이템
export type MapListItem = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  provider: string;
  rating: number;
  userRatingsTotal: number;
  distanceMeters: number | null;
  phone: string | null;
  placeUrl: string;
};

// 응답은 아이템 배열
export type MapListResponse = MapListItem[];
