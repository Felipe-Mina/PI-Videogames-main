import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { alphSort, genresFilter, getVideogames, ratingSort } from '../../redux/actions';
import mando from '../../images/mando.png'
import './navBar.css'

export const NavBar = ({setCurrentPage, disable, formDisable, homeDisable, searchDisable}) => {

  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genres);

  function onChangeExist(e){
    let value = e.target.value
    if (value === 'all') {
      dispatch(getVideogames())
      setCurrentPage(1)
    }
    dispatch(getVideogames(value))
    setCurrentPage(1)
  }

  function onChangeGenres(e){
    let value = e.target.value;
    dispatch(genresFilter(value))
    setCurrentPage(1)
  }

  function onChangeAlph(e){
    let value = e.target.value;
    dispatch(alphSort(value))
    setCurrentPage(1)
  }

  function onChangeRating(e){
    let value = e.target.value;
    dispatch(ratingSort(value))
    setCurrentPage(1)
  }

  return (
    <>
      <div className="navbar">
        <div className="nav-img">
          <Link to={"/home"}>
            <img src={mando} alt="" />
          </Link>
        </div>
        <div className="nav-btn-container">
        <select disabled={disable} onChange={onChangeGenres} className="nav-button" name="genres" defaultValue='genres'>
          <option value="genres">Genres</option>
          {genres.map((e, i) => {
            return <option key={i} value={e}>{e}</option>
          })}
        </select>

        <select disabled={disable} onChange={onChangeExist} className="nav-button" name="existing" defaultValue='existing'>
            <option value="existing" disabled hidden>Existing</option>
            <option value="exist">Existent</option>
            <option value="created">created</option>
            <option value="all">All</option>
            
        </select>

        <select disabled={disable} onChange={onChangeAlph} className="nav-button" name="alpha" defaultValue='alpha'>
          <option value="alpha" disabled hidden>Aplhabetic</option>
          {/* <option style={{display: 'none'}}>Alphabetic</option> */}
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select disabled={disable} onChange={onChangeRating} className="nav-button" name="rating" defaultValue='rating'>
          <option value="rating" disabled hidden>Rating</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
          <Link to="/search">
            <button disabled={searchDisable} className="nav-button">
              Search
            </button>
          </Link>
          <Link to="/form">
            <button disabled={formDisable} className="nav-button">
              Create Game
            </button>
          </Link>
          <Link to="/home">
            <button disabled={homeDisable} className="nav-button">
              To home
            </button>
          </Link>
          </div>
      </div>
    </>
  )
}
