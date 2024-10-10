import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Alteração aqui
import api, { getPokemonImageUrl2 } from "../../services/api";

import { Pokeball } from "../Spinner";
import { Badge } from "./styles";

import "./styles.css";

// Definindo os tipos para o estado do Pokémon e suas espécies
interface IPokemon {
  name: string;
  types: string[];
  abilities: any[]; // Você pode definir um tipo mais específico aqui se desejar
  id: number;
  weight: number;
  height: number;
  spriteImageUrl: string;
  shinySpriteImageUrl: string;
  baseStats: number[];
  evs: string;
}

interface PokemonSpecies {
  description: string[];
  genderRatioFemale: number;
  genderRatioMale: number;
  catchRate: number;
  eggGroups: string;
  hatchSteps: number;
}

const Pokemon: React.FC = () => {
  const { pokemonIndex } = useParams<{ pokemonIndex: string }>(); // Alteração aqui
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePokemon, setImagePokemon] = useState("");

  useEffect(() => {
    const loadPokemonData = async () => {
      if (pokemonIndex) {
        const response = await api.get(`pokemon/${pokemonIndex}`);
        const { name, types, id, weight, height, sprites, stats, abilities } =
          response.data;
        setPokemon({
          name: name.replace(/-/g, " "),
          types: types.map(
            (typeInfo: any) =>
              typeInfo.type.name[0].toUpperCase() + typeInfo.type.name.slice(1)
          ),
          abilities: abilities,
          id: id,
          weight: weight / 10,
          height: height / 10,
          spriteImageUrl: sprites.front_default,
          shinySpriteImageUrl: sprites.front_shiny,
          baseStats: stats.map((stat: any) => stat.base_stat),
          evs: stats
            .filter((stat: any) => stat.effort > 0)
            .map(
              (stat: any) =>
                `${stat.effort} ${stat.stat.name
                  .split("-")
                  .map(
                    (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
                  )
                  .join(" ")}`
            )
            .join(", "),
        });

        const speciesResponse = await api.get(
          `pokemon-species/${pokemonIndex}`
        );
        const {
          flavor_text_entries,
          gender_rate,
          capture_rate,
          egg_groups,
          hatch_counter,
        } = speciesResponse.data;
        setPokemonSpecies({
          description: flavor_text_entries
            .filter((flavor: any) => flavor.language.name === "en")
            .map((flavor: any) => flavor.flavor_text),
          genderRatioFemale: gender_rate * 12.5,
          genderRatioMale: 12.5 * (8 - gender_rate),
          catchRate: Math.round((100 / 255) * capture_rate),
          eggGroups: egg_groups
            .map((group: any) =>
              group.name
                .split(" ")
                .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            )
            .join(", "),
          hatchSteps: 255 * (hatch_counter + 1),
        });

        setImagePokemon(getPokemonImageUrl2(id));
        setIsLoading(false);
      }
    };

    loadPokemonData();
  }, [pokemonIndex]);

  const baseStatsName = [
    "HP",
    "Attack",
    "Defense",
    "Sp. Attack",
    "Sp. Defense",
    "Speed",
  ];

  if (isLoading || !pokemon) {
    return <Pokeball />;
  }

  return (
    <div className="col-12 fadeIn">
      <h1 className="text-center text-uppercase Section-Heading">
        {pokemon.name}
      </h1>

      <div
        className="row justify-content-center"
        style={{ position: "relative", paddingBottom: "1rem" }}
      >
        <div className="col-lg-3 col-md-2 bioDiv d-flex flex-wrap justify-content-center">
          <div className="inner">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-right font-weight-bold">ID</td>
                  <td># {pokemon.id}</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Height</td>
                  <td style={{ whiteSpace: "nowrap" }}>{pokemon.height} Mt</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Weight</td>
                  <td style={{ whiteSpace: "nowrap" }}>{pokemon.weight} Kg</td>
                </tr>
                <tr>
                  <td className="text-right font-weight-bold">Abilities</td>
                  <td>
                    <span className="abilities">
                      {pokemon.abilities.map((ability, index) => (
                        <Badge
                          key={index}
                          className={`ability ${pokemon.types[0]} text-uppercase`}
                          role="button"
                          style={{
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            boxShadow: "none",
                          }}
                        >
                          {ability.ability.name}
                        </Badge>
                      ))}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    className="text-right font-weight-bold"
                    style={{ verticalAlign: "middle" }}
                  >
                    Type
                  </td>
                  <td>
                    <div className="row" style={{ flexWrap: "nowrap" }}>
                      {pokemon.types.map((type, index) => (
                        <Badge
                          key={index}
                          className={`icon ${type} text-capitalize`}
                        >
                          <span className="text-white font-weight-bold">
                            {type}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-5 d-flex flex-wrap align-items-center">
          <div className="image-container">
            <img
              alt=""
              className="Image img-fluid mx-auto my-auto d-block fadeInOut"
              src={imagePokemon}
              style={{
                zIndex: "100 !important",
                maxWidth: "85%",
                height: "auto",
                paddingTop: "10px",
              }}
            />
          </div>
        </div>

        <div className="col-lg-3 col-md-2 statDiv my-auto mx-auto d-flex flex-wrap justify-content-center">
          <div className="inner">
            <table className="table table-borderless">
              <tbody>
                {pokemon.baseStats.map((stat, index) => (
                  <tr key={index}>
                    <td
                      className="text-right font-weight-bold"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {baseStatsName[index]}
                    </td>
                    <td colSpan={3} style={{ width: "100%" }}>
                      <div className="progress">
                        <Badge
                          className={`progress-bar progress-bar-striped progress-bar-animated rounded-sm ${pokemon.types[0]}`}
                          role="progressbar"
                          aria-valuenow={stat}
                          aria-valuemin={0}
                          aria-valuemax={255}
                          style={{ width: `${stat}%` }}
                        >
                          <span>{stat}</span>
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
