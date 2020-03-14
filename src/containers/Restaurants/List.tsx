import React from "react";

interface Props {
  restaurants: Restaurant[];
  onDeleteClick(id: string): void;
  onEditClick(restaurant: Restaurant): void;
}

export default function List({ restaurants, onEditClick, onDeleteClick }: Props) {
  return (
    <div>
      <h1>{`Count: ${restaurants.length}`}</h1>
      {restaurants.map(r => (
        <div key={r.name}>
          <p>{r.name}</p>
          <p>{r.description}</p>
          <p>{r.rating}</p>
          <p>{r.location}</p>
          <p>{r.name}</p>
          <pre>{JSON.stringify(r.tags)}</pre>
          <pre>{JSON.stringify(r.images)}</pre>
          <button onClick={() => onDeleteClick(r.docId || '')}>Delete Restaurant</button>
          <button onClick={() => onEditClick(r)}>Edit Restaurant</button>
          <br />
          <hr />
          <br />
        </div>
      ))}
    </div>
  );
}

// TODO in future if data is hard ot update when editing a restaurant
// check how to structure nested entities in this article https://redux.js.org/advanced/async-actions/
