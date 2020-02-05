import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const searchChanged = event => {
    const search = event.target.value;
    setSearch(search);
    setFilteredPokemon(pokemon.filter(poke => poke.name.includes(search)));
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=784")
      .then(res => res.json())
      .then(res => {
        setPokemon(res.results);
        setFilteredPokemon(res.results);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Pokédex</h1>
      </header>
      <div>
        <p className="App-intro">Type a Pokémon below to search!</p>
        <input
          value={search}
          onChange={searchChanged}
          type="search"
          className="poke__search"
        />

        <div className="pokemons">
          {filteredPokemon.map(poke => (
            <Pokemon poke={poke} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Pokemon({ poke }) {
  const imageUrl = poke => {
    const id = poke.url.match(/.*pokemon\/(\d+)\/$/)[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  return (
    <div className="poke">
      <img src={imageUrl(poke)} alt={poke.name} />
      <div className="poke__name">{poke.name}</div>
    </div>
  );
}
