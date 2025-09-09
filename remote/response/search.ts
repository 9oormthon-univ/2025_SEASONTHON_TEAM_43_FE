
export type BakeryItem = {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
};


export type SearchResponse = {
  success: boolean;
  code: string;
  data: BakeryItem[];
};
