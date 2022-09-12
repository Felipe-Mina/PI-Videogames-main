const { Videogame, Genres, Platforms } = require("../db");
const { default: axios } = require("axios");
const Sequelize = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;
require("dotenv").config();
const { API_KEY } = process.env;

const apiGamesUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;
const nameGameUrl = `https://api.rawg.io/api/games?search=`;
const idGamesUrl  = `https://api.rawg.io/api/games/`;
const genresUrl   = `https://api.rawg.io/api/genres?key=${API_KEY}`

const getApiInfo = async () => {
  let games = [];
  try {
    for (let i = 1; i < 6; i++) {
      await (await axios.get(`${apiGamesUrl + '&page=' + i}`)).data.results.map((e) => {
        games.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          genres: e.genres.map((e) => e.name),
        });
      });
    }
    return games;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  try {
    const gamesDb = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const games = gamesDb.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.image,
        description: e.description,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms,
        genres: e.genres.map((e) => e.name),
      };
    });
    return games;
  } catch (error) {
    console.log(error);
  }
};

const getGameByName = async (name) => {
  try {
    const game = await Videogame.findOne({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
      include: [{ model: Genres }],
    });
    if (!game) {
      const data = await (await axios.get(`${nameGameUrl + name + '&key=' + API_KEY}`)).data.results;
      const apiGame = data.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.background_image,
          description: e.description,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          genres: e.genres.map((e) => e.name),
        };
      });
      return apiGame;
    } else {
      const dbGame = {
        id: game.id,
        name: game.name,
        image: game.image,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres.map((e) => e.name),
      };
      return [dbGame];
    }
  } catch (error) {
    return error;
  }
};

const getGameById = async (id) => {
  try {
    const game = await Videogame.findOne({
      where: {
        id: id,
      },
      include: [{ model: Genres }],
    });
    console.log(game)
    if (!game) {
      const apiData = await (await axios.get(`${idGamesUrl + id + "?key=" + API_KEY}`)).data;
      const apiGame = {
        id: apiData.id,
        name: apiData.name,
        image: apiData.background_image,
        description: apiData.description,
        released: apiData.released,
        rating: apiData.rating,
        platforms: apiData.platforms.map((e) => e.platform.name),
        genres: apiData.genres.map((e) => e.name),
      };
      return apiGame;
    } else {
      const dbGame = {
        id: game.id,
        name: game.name,
        image: game.image,
        description: game.description,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms,
        genres: game.genres.map((e) => e.name),
      };
      return dbGame;
    }
  } catch (error) {
    return error;
  }
};

const getApiPlatforms = async() => {
  const dbPlat = await Platforms.findAll()
  try {
    if (!dbPlat.length) {
      const allGames = await getApiInfo()
      const apiPlat = allGames.map((e) => e.platforms).flat(Infinity)
      apiPlat.forEach((e) => {
        Platforms.findOrCreate({
          where: {
            name: e,
          },
        });
      });
      res.send(apiPlat)
    }
    return dbPlat.map((e) => e.name)
  } catch (error) {
    return error
  }
}

const getApiGenres = async () => {
  const dbGenres = await Genres.findAll()
  try {
    if(!dbGenres.length) {
      const genresData = await (await axios.get(genresUrl)).data.results;
      genresData.forEach((e) => {
        Genres.findOrCreate({
          where: {
            name: e.name,
          },
        });
      });
      return await (await Genres.findAll()).map(e => e.name);
    }
    return await (await Genres.findAll()).map(e => e.name);
    //    return await (await Genres.findAll()).map(e => e.name);
  } catch (error) {
    return error;
  }
};

const deleteGame = async(id) => {
  await Videogame.destroy({
    where: {
      id: id
    }
  })
  return 'game deleted'
}

const editGame = async(id) => {
  const {name, image, description, released, rating, platforms, genres} = req.body;
  const editedGame = await Videogame.update({
    name,
    image,
    description,
    released,
    rating,
    platforms,
    genres
  }, {
    where: {
      id: id,
    },
  });
  return editedGame
}

module.exports = {
  getDbInfo,
  getApiInfo,
  getApiGenres,
  getGameByName,
  getGameById,
  deleteGame,
  editGame,
  getApiPlatforms
};
