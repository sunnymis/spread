interface Restaurant {
  name: string;
  location: string;
  rating: number;
  description: string;
  id: string;
  tags: string[];
  images?: File[];
  docId: string;
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
