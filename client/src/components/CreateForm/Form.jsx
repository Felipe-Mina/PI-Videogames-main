import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms } from '../../redux/actions';
import { NavBar } from '../NavBar/NavBar';
import './form.css'

export const Form = () => {
  const dispatch = useDispatch()
  const genres = useSelector((state) => state.genres)
  const plat = useSelector((state) => state.platforms)

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  

  const [newGame, setNewGame] = useState({
    name: '',
    image: '',
    description: '',
    released: '',
    rating: '',
    platforms: [],
    genres: [],
  })

  function onChangeInput(e) {
    e.preventDefault()
    e.target.setCustomValidity(`please complete ${e.target.value}`)
    setNewGame({
      ...newGame,
      [e.target.name]: e.target.value
    });
  }

  function onChangePlatforms(e) {
    e.preventDefault()
    if (!newGame.platforms.includes(e.target.value)) {
      setNewGame({
        ...newGame,
        [e.target.platforms]: newGame.platforms.push(e.target.value)
      });
    }
  }

  function handlePlatformsDelete(e) {
    setNewGame({
      ...newGame,
      platforms: newGame.platforms.filter((p) => p !== e),
    });
  }

  function onChangeGenres(e) {
    e.preventDefault()
    if (!newGame.genres.includes(e.target.value) && newGame.genres.length <= 3) {
      setNewGame({
        ...newGame,
        [e.target.genres]: newGame.genres.push(e.target.value)
      });
    }
  }

  function handleGenresDelete(e) {
    setNewGame({
      ...newGame,
      genres: newGame.genres.filter((g) => g !== e),
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
    await axios.post('http://localhost:3001/games', newGame);
    alert('created')
    setNewGame({
      name: '',
      image: '',
      description: '',
      released: '',
      rating: '',
      platforms: [],
      genres: [],
    })
    } catch (error) {
      console.log(error);
    }
  }

  const alert = function(error){
    if (error !== 'undefined') {
      const mod = document.getElementById('alert')
      const modText = document.getElementById('content-text')
      if (error === 'created') {
        mod.style.cssText = 'display: flex; background-color: rgba(79, 240, 10, 0.87); min-height: 40px; width: 430px; border-radius: 50px; margin-top: 7px; padding: 20px;'
        modText.innerHTML = '<strong>¡Congratulations!</strong> You created ' + `<strong>${newGame.name}</strong>`
        setTimeout(function(){
          mod.style.display='none'
        }, 5000)
      }else {
        mod.style.cssText = 'display: flex; background-color: rgba(240, 10, 10, 0.87); min-height: 40px; width: 430px; border-radius: 50px; margin-top: 7px; padding: 20px;'
        modText.innerHTML = '<strong>¡Stop!</strong> You cant leave the ' + `${error}` + ' empty. Please complete all the inputs'
        setTimeout(function(){
          mod.style.display='none'
        }, 3000)
      }
    }
  }

  const funcion = function(){
    let g = newGame;
    for(const e in g) {
      if (!g[e] || !g[e].length) {
        alert(e)
      }else {
        continue
      }break
    }
  }

  return (
    <>
      <NavBar disable='on' formDisable='on' />
      <div className='form-container'>
      <div className="content__alert" id='alert' style={{display: "none"}}>
         <div id='content-text' ></div>
      </div>
        <form className='form' action="#" method='post'>
          <div>
            <input
              className='form-input'
              type="text" 
              value={newGame.name}
              placeholder='chose a name'
              name='name'
              onChange={(e) => onChangeInput(e)}
              
            />
          </div>
          <div>
            <input
                className='form-input'
                type="text" 
                value={newGame.image}
                autoComplete='false'
                placeholder='upload an image'
                name='image'
                onChange={(e) => onChangeInput(e)}
              />
          </div>
          <div>
            <input
                className='form-input'
                type="text" 
                value={newGame.description}
                autoComplete='false'
                placeholder='describes the game'
                name='description'
                onChange={(e) => onChangeInput(e)}
              />
          </div>
          <div>
            <input
                className='form-input'
                type="date" 
                value={newGame.released}
                autoComplete='false'
                placeholder='release date'
                name='released'
                onChange={(e) => onChangeInput(e)}
              />
          </div>
          <div>
            <input
                className='form-input'
                type="number" 
                min={1}
                max={5}
                value={newGame.rating}
                autoComplete='false'
                placeholder='gives a score'
                name='rating'
                onChange={(e) => onChangeInput(e)}
              />
          </div>
          <div>
            <select className='form-select' onChange={onChangePlatforms} name="platforms" id="" defaultValue='Platforms'>
              <option value="platforms" hidden>Platforms</option>
              {
                plat.map((e, i) => {
                  return <option key={i} value={e}>{e}</option>
                })
              }
            </select>
            <div
              className='select-flex'
            >
              {
                newGame.platforms?.map((e, i) => {
                  return (
                    <div
                      className='selected-contain'
                      key={i}
                    >
                      {e}
                      <div
                        className='x-button'
                        onClick={()=>{
                          handlePlatformsDelete(e)
                        }}
                      >
                        X
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            <select className='form-select' onChange={onChangeGenres} name="genres" id="" defaultValue='Genres'>
              <option value="genres" hidden>Genres</option>
              {
                genres.map((e, i) => {
                  return <option key={i} value={e}>{e}</option>
                })
              }
            </select>
            <div
              className='select-flex'
            >
              {
                newGame.genres?.map((e, i) => {
                  return (
                    <div
                      className='selected-contain'
                      key={i}
                    >
                      {e}
                      <div
                        className='x-button'
                        onClick={()=>{
                          handleGenresDelete(e)
                        }}
                      >
                        X
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='button-div' onMouseEnter={funcion}>
            <button
              className='form-button'
              type='submit'
              value='create'
              id='form-button'
              onClick={handleSubmit}
              disabled={
                !newGame.name ||
                !newGame.image ||
                !newGame.description ||
                !newGame.released ||
                !newGame.rating ||
                !newGame.platforms.length ||
                !newGame.genres.length
              } 
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
