import React, { useState } from "react";
import "./styles.css";

interface SearchProps {
  getQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ getQuery }) => {
  const [text, setText] = useState("");

  const onChange = (q: string) => {
    setText(q);
    getQuery(q);
  };

  console.log(text);

  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokemon"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </section>
  );
};

export default Search;
