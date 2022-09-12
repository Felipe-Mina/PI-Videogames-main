import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { gameDetail } from '../../redux/actions';
import './card.css'

export default function Card({name, image, genres, id}) {
  const dispatch = useDispatch();    

    function onChangeId() {
      dispatch(gameDetail(id))
    }
  return (
    <div on key={id}>
      <Link style={{textDecoration: 'none'}} to={`/home/${id}`}  >
      <div className='card-contain' onClick={onChangeId}>
        <h3 style={{color: 'black'}} className='card-name'>{name}</h3>
        <img className='image-size' src={image} alt="no image" width="auto" height="250px" />
        <div className='genres-contain'>
          {
            genres?.map(e => <div style={{color: 'white'}} className='genres-div' key={e}>{e}</div>)
          }
        </div>
      </div>
      </Link>
    </div>
  )
}
