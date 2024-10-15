import React, { useState } from "react";
import { Pokeball } from "../Spinner";
import { Pagination } from "semantic-ui-react";
import PokemonCard from "../PokemonCard";
import Search from "../Search";

import { App, PaginationContainer } from "./styles";
import useFetchPokemons from "../../Hooks/useFetchPokemons";

const PokemonList = () => {
  const totalPokemon = 807;
  const pokemonPerPage = 54;
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");

  const { pokemons, isLoading, error } = useFetchPokemons(
    pokemonPerPage,
    currentPage
  );

  const onPaginationClick = (pageInfo: any) => {
    setCurrentPage(pageInfo.activePage * pokemonPerPage - pokemonPerPage);
  };

  const totalPage = Math.ceil(totalPokemon / pokemonPerPage);

  const renderPokemonsList = () => {
    return pokemons
      .filter((pokemon) => pokemon.name.includes(query))
      .map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />);
  };

  if (isLoading) return <Pokeball />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Search getQuery={(q: any) => setQuery(q)} />
      <PaginationContainer>
        <Pagination
          defaultActivePage={1}
          totalPages={totalPage}
          onPageChange={onPaginationClick}
        />
      </PaginationContainer>
      <App>{renderPokemonsList()}</App>
    </>
  );
};

export default PokemonList;
