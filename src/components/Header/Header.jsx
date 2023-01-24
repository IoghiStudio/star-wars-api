import React from 'react';
import './Header.scss';


export const Header = () => {
  return (
    <header className='header'>
      <a
        href="/"
        className='header__logo'
      >
        <img
          src={require('../../images/logo.png')}
          alt="logo"
        />
      </a>
      <div className='header__description'>
        <h1 className='header__title'>
          Welcome to star wars api search
        </h1>
        <p className='header__text'>
          by <em className='header__text-name'>Nicusor Iorga</em>
        </p>
      </div>
    </header>
  );
};