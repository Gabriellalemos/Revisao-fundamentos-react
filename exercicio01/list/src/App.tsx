import React from "react";
import ItemList from "./itensList";
import { list } from "./data";
import ClassItemList from "./ClassItemList";

function App() {
  return (
    <div className="App">
      <h1>Lista de Exercícios</h1>
      <ItemList items={list} />
      <h1>Lista de Exercícios com componente de CLASSE</h1>
      <ClassItemList items={list} />
    </div>
  );
}

export default App;
