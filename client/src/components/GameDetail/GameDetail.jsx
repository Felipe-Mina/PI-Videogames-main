import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteGame, gameDetail, setDetail } from '../../redux/actions'
import { Loading } from '../Loading/Loading'
import { NavBar } from '../NavBar/NavBar'
import './gameDetail.css'

export const GameDetail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const detail = useSelector((state) => state.gameDetail)

  useEffect(() => {
    dispatch(gameDetail(id))
    {dispatch(setDetail())}
  }, [dispatch, id])
  
if(detail.length === 0){
  return (
    <>
      <NavBar disable={true} />
      <div className='detail-contain'>
        <Loading />
      </div>
    </>
  )
}else {
  return (
    <div>
      <NavBar disable={true} />
      <div>
        <div className='detail-contain'>
          <div className='name-image'>
            <div>
              <h1>{detail?.name}</h1>
            </div>
            <div>
              <img width={'400px'} src={detail.image? detail.image: 'cargando'} alt="no image" />
            </div>
            <div>
              <h3>Released: {detail?.released}</h3>
            </div>
            <div>
              <h3>Rating: {detail.rating} stars</h3>
            </div>
            <div className='arrays'>
              <div className='platforms'>
                <h3>Platforms:</h3> 
                {
                  detail.platforms?.map((e) => {
                    return <h5 key={e}>{e}</h5>
                  })
                }
              </div>
              <div>
                <h3>Genres:</h3>
                {
                  detail.genres?.map((e) => {
                    return <h5 key={e}>{e}</h5>
                  })
                }
              </div>
            </div>
          </div>
          <div className='description-contain'>
            <div dangerouslySetInnerHTML={{__html: detail.description}}>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}