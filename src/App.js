import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import './App.scss'

// import MemoryMosaic from './memory-mosaic'
// import Home from 'pages/home'
import Routes from 'utils/routes'

class App extends Component {

  render() {
    return (
      <Routes />
    )
  }
}

export default App
