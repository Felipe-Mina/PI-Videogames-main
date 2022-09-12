const initialState = {
  allGames: [],
  genresGames: [],
  platforms: [],
  genres: [],
  searchGames: [],
  gameDetail: [],
  loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        allGames: action.payload,
        genresGames: action.payload,
        loading: false,
      };
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      }
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GENRES_FILTER":
      const genresGamesState = state.genresGames;
      const filteredGames = genresGamesState.filter((e) => {
        return e.genres.includes(action.payload);
      });
      return {
        ...state,
        allGames: [...filteredGames],
      };
    case "GAME_DETAIL":
      return {
        ...state,
        gameDetail: action.payload,
      };
    case 'SET_DETAIL':
      return {
        ...state,
        gameDetail: action.payload,
      }
    case "ALPH_SORT":
      let gamesStateAlph = state.allGames;
      const sortAlphGames =
        action.payload === "asc"
          ? gamesStateAlph.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : gamesStateAlph.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allGames: [...sortAlphGames],
      };
    case 'RATING_SORT':
        let gamesStateRating = state.allGames
        const ratingGameSort =
        action.payload === "asc"
          ? gamesStateRating.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (a.rating < b.rating) {
                return -1;
              }
              return 0;
            })
          : gamesStateRating.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
            return {
                ...state,
                allGames: [...ratingGameSort]
            };
    case 'FILTER_NAME':
      return {
        ...state,
        searchGames: action.payload,
        loading: false,
      };
            default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
