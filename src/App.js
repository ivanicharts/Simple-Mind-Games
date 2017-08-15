import React, { Component } from 'react'
// import { browserHistory } from 'react-router'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'

import Routes from 'utils/routes'
import './App.scss'

const socket = io.connect('ws://localhost:3000')
console.log('socket', socket.emit('message', 'data'));
socket.on('message', msg => console.log(msg))
socket.on('connect', msg => (console.log(msg, 'asd')))



class App extends Component {

  render = () => (
    <SocketProvider socket={socket}>
      <Routes />
    </SocketProvider>
  )

}

export default App
