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
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [filteredStarships, setFilteredStarships] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

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
    async function updateFilteredVehicles() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.vehicles) {
          const res = await fetch(link);
          const vehicle = await res.json();
          filtered.push(vehicle.name);
        }

        setFilteredVehicles(filtered);
      } else {
        return;
      }
    }

    async function updateFilteredFilms() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.films) {
          const res = await fetch(link);
          const movie = await res.json();
          filtered.push(movie.title);
        }

        setFilteredFilms([...filtered])
      } else {
        return;
      }
    }

    async function updateFilteredStarships() {
      if (selected) {
        let filtered = [];
  
        for (const link of selected.starships) {
          const res = await fetch(link);
          const starship = await res.json();
          console.log(starship)
          filtered.push(starship.name);
        }

        setFilteredStarships(filtered);
      } else {
        return;
      }
    }

    
    updateFilteredStarships();
    updateFilteredVehicles() 
    updateFilteredFilms();
    
    console.log('update');

    return () => {
      setFilteredFilms([]);
      setFilteredVehicles([]);
      setFilteredVehicles([])
    }
  }, [selected])


  const resetSelected = () => {
    setSelected(null);
    setFilteredFilms([]);
    setFilteredStarships([]);
    setFilteredVehicles([]);
  }

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
              {filteredFilms.length > 0 && (
                <UserData 
                  user={selected}
                  films={filteredFilms}
                  starships={filteredStarships}
                  vehicles={filteredVehicles}
                  onReset={resetSelected}
                />
              )}
            </div>
          )}
      </div>
    </>
  )
};
