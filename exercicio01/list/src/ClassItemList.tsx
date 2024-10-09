import React from "react";

interface Item {
  name?: string;
  age?: number;
}

interface ClassItemListProps {
  items: (number | string | Item)[];
}

class ClassItemList extends React.Component<ClassItemListProps> {
  render() {
    return (
      <ul>
        {this.props.items.map((item, index) => {
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
}

export default ClassItemList;
