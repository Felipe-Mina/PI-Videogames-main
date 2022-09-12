const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { createGame, getGames, getGenres, getByName, getById, deleteById, editById, getPlatforms } = require('../controllers/gamesControllers');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/games', getGames)

router.post('/games', createGame)

router.get('/genres', getGenres)

router.get('/game', getByName)

router.get('/game/:id', getById)

router.delete('/delete/:id', deleteById)

router.put('/game/:id', editById)

router.get('/platforms', getPlatforms)

module.exports = router;
