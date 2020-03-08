import React from "react";

interface Props {
  restaurants: Restaurant[];
  onAddClick(restaurant: Restaurant): void;
  onDeleteClick(id: string): void;
}

export default function Restaurants({ restaurants, onAddClick, onDeleteClick }: Props) {
  const newRestaurant = {
    id: "1",
    name: "super hot New Restaurant",
    location: "UES",
    rating: 5,
    tags: ["taco"],
    description: "coolio place",
    images: ["link-to-img3", "link-to-second-img4"],
    docId: "something"
  };


  return (
    <div>
      <h1>{`Count: ${restaurants.length}`}</h1>
      {restaurants.map(r => (
        <div key={r.docId}>
          <p>{r.name}</p>
          <p>{r.description}</p>
          <p>{r.rating}</p>
          <p>{r.location}</p>
          <p>{r.name}</p>
          <pre>{JSON.stringify(r.tags)}</pre>
          <pre>{JSON.stringify(r.images)}</pre>
          <button onClick={() => onDeleteClick(r.docId)}>Delete Restaurant</button>
          <br />
          <hr />
          <br />
        </div>
      ))}

      <button onClick={() => onAddClick(newRestaurant)}>Add Restaurant</button>
    </div>
  );
}

// TODO in future if data is hard ot update when editing a restaurant
// check how to structure nested entities in this article https://redux.js.org/advanced/async-actions/
