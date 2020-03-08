import React from "react";

interface Props {
  restaurants: Restaurant[];
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(): void;
}

export default function Restaurants({ restaurants, onAddClick, onDeleteClick }: Props) {
  const newRestaurant = {
    id: "1",
    name: "hot New Restaurant",
    location: "UES",
    rating: 5,
    tags: ["taco"],
    description: "coolio place",
    images: ["link-to-img3", "link-to-second-img4"],
    docId: "something"
  };


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
          <br />
          <hr />
          <br />
        </div>
      ))}

      <button onClick={() => onAddClick(newRestaurant)}>Add Restaurant</button>
      <button onClick={onDeleteClick}>Delete Restaurant</button>
    </div>
  );
}

// TODO in future if data is hard ot update when editing a restaurant
// check how to structure nested entities in this article https://redux.js.org/advanced/async-actions/
