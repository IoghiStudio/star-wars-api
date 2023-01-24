import { useState } from "react";
import './SearchForm.scss';

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
        htmlFor="form__search"
      >
        Search your favorite character:
      </label>

      <input
          className="form__input"
          type="text"
          placeholder="ex: Dark Vader"
          id="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
          }}
      />
    </div>

    <div className='form__list'>
      {visibleCharacters.map(char => (
        <p
          key={char.name}
          className='form__card'
          onClick={() => {
            onSelect(char);
          }}
        >{char.name}</p>
      ))}
    </div>
  </>
  )
}