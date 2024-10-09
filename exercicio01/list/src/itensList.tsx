import React from "react";

interface Item {
  name?: string;
  age?: number;
}

interface ItemListProps<T> {
  items: T[];
}

interface ItemListProps<T> {
  items: T[];
}

function ItemList<T extends string | number | Item>({
  items,
}: ItemListProps<T>): JSX.Element {
  return (
    <ul>
      {items.map((item, index) => {
        if (typeof item === "number") {
          return (
            <li key={index}>
              <div>{item}</div>
            </li>
          );
        } else if (typeof item === "string") {
          return (
            <li key={index}>
              <div>{item}</div>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <div>
                {item.name} (age: {item.age})
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ItemList;
