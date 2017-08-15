'use strict';

// import config, { levels } from '../../../../../config/memory-mosaic'
const config = require('../../../../../config/app/memory-mosaic')
const levels = config.levels
const c = config.c
const { generateField } = require('../../../../../config/app/helpers')

let gameData = {}

const userNames = {

}

console.log('levels', levels)


let currentLevel = 0


// Create the chat configuration
module.exports = function (io, socket) {

  socket.on('join room', function (user) {
    console.log('tries to join ' + user, socket.id)
    socket.name = user
    
    socket.join('mm-1', () => {
    console.log('joined mm-1 ' + user, socket.adapter.rooms['mm-1'])

    console.log('players: ', socket.clients)

      userNames[socket.id] = {
        name: socket.name,
        lives: 3,
        level: currentLevel
      }
      io.to('mm-1').emit('joined player', JSON.stringify(Object.values(userNames).map(e => ({name: e.name, lives: e.lives}))));
     
      if (socket.adapter.rooms['mm-1'].length >= 3) {
        gameData = initGame(0)
        io.to('mm-1').emit('start game', Object.assign({currentLevel: 0}, userNames[socket.id], gameData))
      } 
    
    })

  })

  socket.on('level success', () => {
    userNames[socket.id].level = currentLevel + 1

    checkGameState(socket, io)
  })

  socket.on('level fail', () => {
    userNames[socket.id].level = currentLevel + 1
    userNames[socket.id].lives = userNames[socket.id].lives - 1
    checkGameState(socket, io)
  })

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    delete userNames[socket.id]
    console.log('disconnected')
    io.to('mm-1').emit('joined player', sendPlayers(userNames));
  })
}

function checkGameState (socket, io) {
  console.log('check', userNames)
  let flag = true
  for (let key in userNames) {
    if (Object.keys(userNames).length === 1)
      return io.to(key).emit('game over', 'You have won.')
    
    if (userNames[key].level <= currentLevel) flag = false
    if (userNames[key].lives <= 0) {
      io.to(key).emit('game over', 'You have lost.')
      console.log('GAME IS OVER FOR ', userNames[socket.id])
      console.log('id, key', socket.id, key)
      if (socket.id === key) {
        console.log('SHOULD LEAVE', userNames[socket.id].name)
        socket.leave('mm-1')
      }
      delete userNames[key]
      // io.to('mm-1').emit('joined player', sendPlayers(userNames))
    }
  }

  if (!flag) return false

  console.log('new game')
  ++currentLevel
  io.to('mm-1').emit('joined player', JSON.stringify(Object.values(userNames).map(e => ({name: e.name, lives: e.lives}))));
  io.to('mm-1').emit('start game', Object.assign
    (
      { currentLevel },
      userNames[socket.id],
      initGame(currentLevel)
    )
  )
}

function initGame (currentLevel) {
  const fieldSize = levels[currentLevel][c.FIELD_SIZE]
  const cellCount = levels[currentLevel][c.CELL_COUNT]
  const gameData = generateField({
    fieldSize, 
    cellCount, 
    CELL: c.CELL, 
    'EMPTY_CELL': c.EMPTY_CELL
  })

  return gameData
}

function sendPlayers (players) {
  return JSON.stringify(Object.values(players).map(e => ({name: e.name, lives: e.lives})))
}