import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.scss';
import { Header } from '../Header';
import { UserData } from '../UserData';
import { SearchForm } from '../SearchForm';
import * as Api from '../Api';

export const App= () => {
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  
  //propertier for selected character
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);

  async function getCharacters() {
    const characters = await Api.Request('people');
    setCharacters(characters);
  }

  async function updateFilms() {
    if (!selectedChar) {
      return;
    }

    const data = [];
    const arrayOfPromises = selectedChar.films
      .map(url => fetch(url));

    for await (const request of arrayOfPromises) {
      const film = await request.json();
      data.push(film.title);
    }

    setFilms([...data]);
  }

  async function updateStarships() {
      if (!selectedChar) {
      return;
    }
    const data = [];
    const arrayOfPromises = selectedChar.starships
      .map(url => fetch(url));

    for await (const request of arrayOfPromises) {
      const starship = await request.json();
      data.push(starship.name);
    }

    setStarships([...data]);
  }
  
  async function updateVehicles() {
    if (!selectedChar) {
      return;
    }
    const data = [];
    const arrayOfPromises = selectedChar.vehicles
      .map(url => fetch(url));

    for await (const request of arrayOfPromises) {
      const vehicle = await request.json();
      data.push(vehicle.name);
    }

    setVehicles([...data]);
  }

  async function updateSpecies() {
    if (!selectedChar) {
      return;
    }
    const data = [];
    const arrayOfPromises = selectedChar.species
      .map(url => fetch(url));

    for await (const request of arrayOfPromises) {
      const species = await request.json();
      data.push(species.name);
    }

    setSpecies([...data]);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (selectedChar) {
      updateStarships();
      updateVehicles() 
      updateFilms();
      updateSpecies();
      console.log('data loaded')
    } else {
      setFilms([]);
      setVehicles([]);
      setSpecies([]);
      setStarships([]);
      console.log('removed everything');
    }
  }, [selectedChar])

  return (
    <>
      <div className='app'>
        <Header/>

          {!selectedChar ? (
            <SearchForm
              characters={characters}
              onSelect={setSelectedChar}
            />
          ) : (
            <UserData 
              user={selectedChar}
              films={films}
              starships={starships}
              vehicles={vehicles}
              species={species}
              onReset={() => setSelectedChar(false)}
            />
          )}
      </div>
    </>
  )
};
