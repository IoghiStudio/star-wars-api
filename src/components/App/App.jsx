import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.scss';
import { Header } from '../Header';
import { UserData } from '../UserData';

const BASE_URL = 'https://swapi.dev/api/'

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
}

export const App= () => {
  const [characters, setCharacters] = useState([]);

  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function getCharacters() {
      let response = await request('people');
      let people = await response.json();
      setCharacters(people.results);
    }

    async function getFilms() {
      let response = await request('films');
      let films = await response.json();
      setFilms(films.results);
    }

    async function getStarships() {
      let response = await request('starships');
      let ships = await response.json();
      setStarships(ships.results);
    }

    async function getVehicles() {
      let response = await request('vehicles');
      let vehicles = await response.json();
      setVehicles(vehicles.results);
    }

    async function getPlanets() {
      let response = await request('planets');
      let planets = await response.json();
      setPlanets(planets.results);
    }

    getCharacters();
    getFilms();
    getStarships();
    getVehicles();
    getPlanets();
    getCharacters();
  }, []);

  let filteredCharacters = characters;

  if (query.length) {
    filteredCharacters = characters.filter(char => {
      return char.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  let filteredFilms = [];
  let filteredStarships = [];
  let filteredVehicles = [];

  if(selected) {
    filteredFilms = selected.films.map(film => {
      const movie = fetch(film)
        .then(resp => resp.json())
        .then(movie => movie.name)

      return movie;
    })
  }

  const resetSelected = () => {
    setSelected(null);
    filteredFilms = [];
    filteredStarships = [];
    filteredVehicles = [];
  }

  return (
    <>
      <div className='app'>
        <Header/>
          {!selected ? (
            <>
              <div className='form'>
                <label
                  htmlFor="search"
                >
                  Search your favorite character:
                </label>
        
                <input
                    type="text"
                    id="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                    }}
                />
              </div>
        
              <div className='list'>
                {filteredCharacters.map(char => (
                  <card
                    key={char.name}
                    className='list__card'
                    onClick={() => {
                      setSelected(char);
                    }}
                  >{char.name}</card>
                ))}
              </div>
            </>
          ) : (
            <UserData 
              user={selected}
              starships={filteredStarships}
              vehicles={filteredVehicles}
              films={filteredFilms}
              onReset={resetSelected}
            />
          )}
      </div>
    </>
  )
};
