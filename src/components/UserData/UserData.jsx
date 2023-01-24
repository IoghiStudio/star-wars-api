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
      <p className='userData__name'>
        Name: {name}
      </p>

      <p className='userData__gender'>
        Gender: {gender}
      </p>

      <p className='userData__birthday'>
        Birthday: {birth_year}
      </p>
      
      <p className='userData__height'>
        Height: {height}
      </p>

      <p className='userData__mass'>
        Mass: {mass}
      </p>

      <p className='userData__skin'>
        Skin color: {skin_color}
      </p>
      
      <p className='userData__hair'>
        Hair color: {hair_color}
      </p>

      <p>
        Species:
        {species.map(specie => (
          <li
              key={specie}
            >
              {specie}
            </li>
          )
        )}
      </p>

      <p>
        Films:
        {films.map(film => (
            <li
              key={film}
            >
              {film}
            </li>
          )
        )}
      </p>

      <p>
        StarShips:
        {starships.map(starship => (
          <li
              key={starship}
            >
              {starship}
            </li>
          )
        )}
      </p>

      <p>
        Vehicles:
        {vehicles.map(vehicle => (
          <li
              key={vehicle}
            >
              {vehicle}
            </li>
          )
        )}
      </p>
      

      <button
      className='userData__reset'
        onClick={onReset}
      >
        Go Back!
      </button>
    </div>
  )
}