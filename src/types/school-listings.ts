export interface SchoolInfoInterface {
  name: string;
  ranking: string;
  grade: string;
  type: string;
  grades: string;
  location: string;
  reviews: {
    rating: number;
    count: number;
  };
}
