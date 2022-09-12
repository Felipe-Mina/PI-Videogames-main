import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideogames } from '../../redux/actions';
import { GameCards } from '../GameCards/GameCards';
import { Loading } from '../Loading/Loading';
import { NavBar } from '../NavBar/NavBar'
import Paginate from '../Paginate/Paginate';
import './home.css'

export const Home = () => {
  const games = useSelector((state) => state.allGames);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesByPage] = useState(15);

  let indexLastGame = currentPage * gamesByPage;
  let indexFirstGmae = indexLastGame - gamesByPage;
  let currentGame = games.slice(indexFirstGmae, indexLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    if (games.length === 0) {
      dispatch(getVideogames());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className='home-contain'>
      <header>
        <NavBar setCurrentPage={setCurrentPage} homeDisable='on'/>
      </header>
      <main>
        {
          loading === false &&
            <Paginate
            gamesByPage={gamesByPage}
            games={games.length}
            paginate={paginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
          
        }
        <div >
          {loading && <Loading />}
            <div className='home-cards-contain'>
              <GameCards
                currentGame={currentGame}
              />
            </div>
          
        </div>
      </main>
    </div>
  )
}
