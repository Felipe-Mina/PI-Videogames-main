const { Videogame, Genres } = require("../db");
const { v4: uuidv4 } = require("uuid");
const {
  getDbInfo,
  getApiInfo,
  getApiGenres,
  getGameByName,
  getGameById,
  deleteGame,
  editGame,
  getApiPlatforms,
} = require("./utils");

const getGames = async (req, res) => {
  const { existent } = req.query;
  try {
    if (existent) {
      if (existent == "exist") {
        const apiGames = await getApiInfo();
        return res.status(200).send(apiGames);
      }else if(existent == "created") {
        const dbGames = await getDbInfo();
        return res.status(200).send(dbGames)
      }
    }
    const apiGames = await getApiInfo();
    const dbGames = await getDbInfo();
    const totalGames = apiGames.concat(dbGames)
    res.status(200).send(totalGames)
  } catch (error) {
    console.log(existent)
    res.status(400).send("games not found");
  }
};

const getPlatforms = async (req, res) => {
  try {
    const platforms = await getApiPlatforms()
    res.status(200).send(platforms)
  } catch (error) {
    res.status(400).send('platforms not found')
  }
}

const getGenres = async (req, res) => {
  try {
    const genres = await getApiGenres();
    res.status(200).send(genres);
  } catch (error) {
    res.status(400).send("genres not found");
  }
};

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const gameByName = await getGameByName(name);
    gameByName.length
    console.log(name)
    res.status(200).send(gameByName)
  } catch (error) {
    res.status(404).send(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const idGame = await getGameById(id);
    res.status(200).send(idGame);
  } catch (error) {
    res.status(400).send("game id not found");
  }
};

const deleteById = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedById = await deleteGame(id)
        res.status(200).send(deletedById)
    }catch(error) {
        res.status(400).send(error)
    }
}

const editById = async(req, res) => {
    const { id } = req.params;
    try {
        const editedById = await editGame(id)
        res.status(200).send(editedById)
    }catch(error) {
        res.status(400).send(error)
    }
}

const createGame = async (req, res) => {
  let { name, image, description, released, rating, platforms, genres } = req.body;
  const idv4 = uuidv4();
  let dbid = idv4.slice(0, 6);
  try {
    const dbGame = await Videogame.create({
      id: dbid,
      name: name,
      image: image,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
    });
    genres.map(async (g) => {
      const [postGenres, succes] = await Genres.findOrCreate({
        where: {
          name: g,
        },
        defaults: {
          name: g,
        },
      });
      await dbGame.addGenres(postGenres);
    });
    res.status(200).send(dbGame);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGame,
  getGames,
  getPlatforms,
  getGenres,
  getByName,
  getById,
  deleteById,
  editById
};
