import axios from 'axios';


export function getVideogames(exist){
    return async function(dispatch){
        if(exist) {
            let json = await axios.get(`${'/games?existent=' + exist}`)
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            })
        }else {
            let json = await axios.get('/games')
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            })
        }
    }
}

export function getPlatforms(){
    return async function(dispatch){
        let json = await axios.get('/platforms')
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        let json = await axios.get(`/genres`)
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function getGenresPromise() {
    return function(dispatch) {
        axios.get(`/genres`)
        .then(response => dispatch({
            type: 'GET_GERNES_PROMISE',
            payload: response.data
        }))
    }
}

export function filterName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`/game?name=${name}`)
            return dispatch({
                type: 'FILTER_NAME',
                payload: json.data
            })
        }catch(error) {
            if (error.response) {
                alert(error.response.data)
            }
        }
    }
}

export function gameDetail(id){
    return async function(dispatch){
        let json = await axios.get(`/game/${id}`)
        return dispatch({
            type: 'GAME_DETAIL',
            payload: json.data
        })
    }
}

export function setDetail(){
    return{
        type: 'SET_DETAIL',
        payload: []
    }
}

export function genresFilter(value){
    return {
        type: 'GENRES_FILTER',
        payload: value
    }
}

export function alphSort(value){
    return {
        type: 'ALPH_SORT',
        payload: value
    }
}

export function ratingSort(value){
    return {
        type: 'RATING_SORT',
        payload: value
    }
}

export function clear(){
    return {
        type: 'CLEAR',
        payload: []
    }
}