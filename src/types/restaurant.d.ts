export interface Restaurant {
  name: string;
  location: string;
  rating: number;
  description: string;
  tags: string[];
  images?: File[];
  thumbnailImage?: string;
}

export interface FormValues {
  name: string;
  location: string;
  rating: number;
  description: string;
  tags: string;
  images?: File[];
  thumbnailImage?: string;
}

export interface RestaurantDTO {
  restaurant: Restaurant;
  documentId: string;
}
