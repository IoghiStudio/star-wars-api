import './UserData.scss';

export const UserData = ({
  user,
  onReset,
  films,
  starships,
  vehicles,
  species
}) => {

  const {
    name,
    gender,
    birth_year,
    height,
    mass,
    skin_color,
    hair_color,
  } = user;

  return (
    <div className="userData">
      <p className='userData__p'>
        Name: {name}
      </p>

      <p className='userData__p'>
        Gender: {gender}
      </p>

      <p className='userData__p'>
        Birthday: {birth_year}
      </p>
      
      <p className='userData__p'>
        Height: {height}
      </p>

      <p className='userData__p'>
        Mass: {mass}
      </p>

      <p className='userData__p'>
        Skin color: {skin_color}
      </p>
      
      <p className='userData__p'>
        Hair color: {hair_color}
      </p>

      <div className="userData__categories">
        <ul className='userData__films userData__category'>
          Films:
          {films.length 
            ? (
              <>
                {films.map(film => (
                  <li
                      key={film}
                    >
                      {film}
                    </li>
                  )
                )}
              </>
            ) : (
              <>
                No films!
              </>
            )}
        </ul>

        <ul className='userData__starships userData__category'>
          StarShips:
          {starships.length 
            ? (
              <>
                {starships.map(starship => (
                  <li
                      key={starship}
                    >
                      {starship}
                    </li>
                  )
                )}
              </>
            ) : (
              <>
                No starships!
              </>
            )}
        </ul>

        <ul className='userData__vehicles userData__category'>
          Vehicles:
          {vehicles.length 
            ? (
              <>
                {vehicles.map(vehicle => (
                  <li
                      key={vehicle}
                    >
                      {vehicle}
                    </li>
                  )
                )}
              </>
            ) : (
              <>
                No vehicles!
              </>
            )}
        </ul>

        <ul className='userData__species userData__category'>
          Species:
          {species.length 
            ? (
              <>
                {species.map(specie => (
                  <li
                      key={specie}
                    >
                      {specie}
                    </li>
                  )
                )}
              </>
            ) : (
              <>
                No species!
              </>
            )}
        </ul>
      </div>
      

      <button
        className='userData__reset'
        onClick={onReset}
      >
        Go Back!
      </button>
    </div>
  )
}