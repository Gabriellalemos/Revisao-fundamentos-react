import React, { useState, useEffect } from "react";
import { getPokemonImageUrl } from "../../services/api";
import axios from "axios";

import { PokeballMini } from "../Spinner";

import {
  Card,
  StyledLink,
  CardName,
  CardImg,
  CardDetails,
  CardId,
} from "./styles";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const [imagePokemon, setImagePokemon] = useState("");
  const [pokemonId, setPokemonId] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState<
    { type: { name: string } }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const loadIdPokemon = async () => {
      await axios.get(pokemon.url).then((response) => {
        setPokemonId(response.data.id);
        setPokemonTypes(response.data.types);
      });

      await setImagePokemon(getPokemonImageUrl(pokemonId));
    };

    loadIdPokemon();

    setIsLoading(false);
  }, [pokemon.url, pokemonId]);

  const nameCapitalized = pokemon.name.split("-")[0];

  const pokemonType = pokemonTypes.map(
    (type) => type.type.name[0].toUpperCase() + type.type.name.slice(1)
  );

  if (isLoading) {
    return <PokeballMini />;
  } else if (pokemonId.length > 807) {
    return <div></div>;
  } else {
    return (
      <StyledLink to={`pokemon/${pokemonId}`}>
        <Card className={pokemonType[0]}>
          <CardId className={pokemonType[0]}># {pokemonId}</CardId>
          {imageLoading ? <PokeballMini /> : null}
          <CardImg
            onLoad={() => {
              setImageLoading(false);
            }}
            src={imagePokemon}
            alt={nameCapitalized}
            style={imageLoading ? undefined : { display: "block" }}
          />
          <CardName>{nameCapitalized}</CardName>
          <CardDetails>{pokemonType.join(" / ")}</CardDetails>
        </Card>
      </StyledLink>
    );
  }
};

export default PokemonCard;
