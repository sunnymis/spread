import React from "react";

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  tags: string[];
  description: string;
  images: string[];
  docId: string;
}

interface Props {
  restaurants: Restaurant[];
  onAddClick(): void;
  onDeleteClick(): void;
}

export default function Restaurants({ restaurants, onAddClick, onDeleteClick }: Props) {
  return (
    <div>
      {restaurants.map(r => (
        <div key={r.docId}>
          <p>{r.name}</p>
          <p>{r.description}</p>
          <p>{r.rating}</p>
          <p>{r.location}</p>
          <p>{r.name}</p>
          <pre>{JSON.stringify(r.tags)}</pre>
          <pre>{JSON.stringify(r.images)}</pre>
        </div>
      ))}

      <button onClick={onAddClick}>Add Restaurant</button>
      <button onClick={onDeleteClick}>Delete Restaurant</button>
    </div>
  );
}

// TODO in future if data is hard ot update when editing a restaurant
// check how to structure nested entities in this article
