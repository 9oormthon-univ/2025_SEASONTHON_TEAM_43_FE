// remote/response/explore.ts
export type ExploreRequest = {
  lat: number;
  lng: number;
};

export type ExploreItem = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  intro: string;
  distance: number;
};

export type ExploreResponse = {
  success: boolean;
  code: string;
  data: ExploreItem[];
};
