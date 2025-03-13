export interface School {
  id: number;
  name: string;
  location: string;
  grade: string;
  position: { lat: number; lng: number };
  image: string;
}
