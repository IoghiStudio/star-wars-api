import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.scss';
import { Header } from '../Header';
import { UserData } from '../UserData';
import { SearchForm } from '../SearchForm';

const BASE_URL = 'https://swapi.dev/api/'

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
}

export const App= () => {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [species, setSpecies] = useState([]);

  // const [films, setFilms] = useState([]);
  // const [starships, setStarships] = useState([]);
  // const [vehicles, setVehicles] = useState([]);
  // const [planets, setPlanets] = useState([]);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function getCharacters() {
      let response = await request('people');
      let people = await response.json();
      setCharacters(people.results);
    }

    // async function getFilms() {
    //   let response = await request('films');
    //   let films = await response.json();
    //   setFilms(films.results);
    // }

    // async function getStarships() {
    //   let response = await request('starships');
    //   let ships = await response.json();
    //   setStarships(ships.results);
    // }

    // async function getVehicles() {
    //   let response = await request('vehicles');
    //   let vehicles = await response.json();
    //   setVehicles(vehicles.results);
    // }

    // async function getPlanets() {
    //   let response = await request('planets');
    //   let planets = await response.json();
    //   setPlanets(planets.results);
    // }

    getCharacters();
    // getFilms();
    // getStarships();
    // getVehicles();
    // getPlanets();
    // getCharacters();
  }, []);

  useEffect(() => {
    async function updateVehicles() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.vehicles) {
          const res = await fetch(link);
          const vehicle = await res.json();
          filtered.push(vehicle.name);
        }

        setVehicles([...filtered]);
      }
    }

    async function updateFilms() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.films) {
          const res = await fetch(link);
          const movie = await res.json();
          filtered.push(movie.title);
        }

        setFilms([...filtered])
      }
    }

    async function updateStarships() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.starships) {
          const res = await fetch(link);
          const starship = await res.json();
          filtered.push(starship.name);
        }

        setStarships([...filtered]);
      }
    }

    async function updateSpecies() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.species) {
          const res = await fetch(link);
          const specie = await res.json();
          filtered.push(specie.name);
        }

        setSpecies([...filtered]);
      }
    }

    
    updateStarships();
    updateVehicles() 
    updateFilms();
    updateSpecies();
    
    console.log('update');

    return () => {
      setFilms([]);
      setVehicles([]);
      setVehicles([])
    }
  }, [selected])


  // const resetSelected = () => {
  //   setSelected(null);
  //   setFilms([]);
  //   setStarships([]);
  //   setVehicles([]);
  // }

  return (
    <>
      <div className='app'>
        <Header/>
          {!selected ? (
            <SearchForm
              characters={characters}
              onSelect={setSelected}
            />
          ) : (
            <div>
              UserData
                <UserData 
                  user={selected}
                  films={films}
                  starships={starships}
                  vehicles={vehicles}
                  species={species}
                  onReset={() => setSelected(false)}
                />
            </div>
          )}
      </div>
    </>
  )
};
