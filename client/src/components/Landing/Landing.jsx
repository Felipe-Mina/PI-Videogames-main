import React from 'react'
import './landing.css'
import button from '../../images/landin-button-image.gif'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className='landing-container'>
      <Link to='/home'>
        <img src={button} alt="no image" />
      </Link>
    </div>
  )
}
