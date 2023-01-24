import { useState } from "react";

export const SearchForm = ({
  characters,
  onSelect
}) => {
  const [query, setQuery] = useState('');

  let visibleCharacters = characters;

  if (query.length) {
    visibleCharacters = characters.filter(char => {
      return char.name.toLowerCase().includes(query.toLowerCase())
    })
  }

  return (
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
      {visibleCharacters.map(char => (
        <p
          key={char.name}
          className='list__card'
          onClick={() => {
            onSelect(char);
          }}
        >{char.name}</p>
      ))}
    </div>
  </>
  )
}