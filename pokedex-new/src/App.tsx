import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#fff" }}>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokemon/:pokemonIndex" element={<Pokemon />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
