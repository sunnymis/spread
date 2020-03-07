export interface Card {
  title: string;
}

export interface Store {
  cards: Card[];
}

export interface Restaurant {
  id: string,
  name: string;
  location: string;
  rating: number;
  tags: string[];
  description: string;
  images: string[];
}
