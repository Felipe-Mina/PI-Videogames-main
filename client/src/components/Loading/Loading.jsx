import React from 'react'
import loadingImage from '../../images/utils-loading2.gif'
import './loading.css'

export function Loading(){
    return(
    <div className='loading-contain'>
        <img className='loading-img' src={loadingImage} alt="no loading image" />
    </div>
    )
}