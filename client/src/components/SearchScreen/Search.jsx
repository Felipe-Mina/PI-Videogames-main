import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterName } from '../../redux/actions';
import { NavBar } from '../NavBar/NavBar';
import { Loading } from '../Loading/Loading'
import { GameCards } from '../GameCards/GameCards';
import './search.css'

export const Search = () => {
  
  const dispatch = useDispatch();

  const [games, setGames] = useState('');

  const findedGames = useSelector((state) => state.searchGames)
  const loading = useSelector((state) => state.loading)

  const handleImputChange = (e) => {
    console.log(e.target.value)
    e.preventDefault();
    setGames(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setGames('');
    dispatch(filterName(games))
  }
  return (
    <div>
      <NavBar disable='on' searchDisable='on'/>
      <div className='search-screen'>
        <div className='search'>
          <form onSubmit={(e) => onSubmit(e)}>
            <input 
              type="text"
              placeholder='Type the name of a game...'
              className='search-input'
              value={games}
              onChange={(e) => handleImputChange(e)}
              required={true}
            />
            <button type='submit' className="btn-search">🔎</button>
          </form>
        </div>
        <div className='results'>
          {loading && <Loading />}
          <GameCards
            currentGame={findedGames}
          />
        </div>
      </div>
    </div>
  )
}
