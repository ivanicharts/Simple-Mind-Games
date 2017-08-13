'use strict';

const userNames = {

}

// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  // io.emit('chatMessage', {
  //   type: 'status',
  //   text: 'Is now connected',
  //   created: Date.now(),
  //   profileImageURL: socket.request.user.profileImageURL,
  //   username: socket.request.user.username
  // })

  io.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    // profileImageURL: socket.request.user.profileImageURL,
    // username: socket.request.user.username
  });

  socket.on('join room', function (user) {
    console.log('tries to join ' + user, socket.id)
    socket.name = user
    
    socket.join('mm-1', () => {
    console.log('joined mm-1 ' + user, socket.adapter.rooms['mm-1'])

    console.log('players: ', socket.clients)

      userNames[socket.id] = socket.name
      io.to('mm-1').emit('joined player', JSON.stringify(userNames));
     
      if (socket.adapter.rooms['mm-1'].length >= 2) {
        io.to('mm-1').emit('start game', {field: 132})
      } 
    
    })

  })

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    // message.profileImageURL = socket.request.user.profileImageURL;
    // message.username = socket.request.user.username;

    // Emit the 'chatMessage' event
    io.emit('chatMessage', message);
  });

  socket.on('connectMess', (data) => {
    console.log(data);
  })

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    delete userNames[socket.id]
    console.log('disconnected')
    io.to('mm-1').emit('joined player', JSON.stringify(userNames));
  });
};
