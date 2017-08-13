import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { socketConnect } from 'socket.io-react'

import MemoryMosaic from 'shared/games/memory-mosaic'

import Btn from 'shared/components/button'

import './style.scss'

class MMOnline extends PureComponent {

  state = {
    players: {},
    joined: false,
    gameIsStarted: false,
    gameData: {},
    gameIsOver: false
  }

  componentDidMount = () => {
    this.props.socket.on('start game', (gameData) => {
      console.log('start game', gameData)
      this.setState({ gameIsStarted: true, gameData})
    })

    this.props.socket.on('joined player', (players) => {
      this.setState({ players: JSON.parse(players), joined: true })
      console.log('joined new player ' + players)
    })

    this.props.socket.on('game over', () => {
      console.log('GAME OVER')
      this.setState({joined: false, gameIsOver: true, gameIsStarted: false})
    })
  }

  componentWillUnmount = () => {
    this.props.socket.removeAllListeners()
  }

  connectHandler = () => {
    this.props.socket.emit('join room', this.refs.playerName.value)
  }

  onLevelSuccess = () => this.props.socket.emit('level success')

  onLevelFail = () => this.props.socket.emit('level fail')
  // this.props.socket.emit('join room', 'me')

  render = () => {
    const { joined, players, gameIsStarted, gameData, gameIsOver } = this.state

    return (
      <div className='memory-mosaic-wrapper mosaic-memory-online'>
        <Link to='/'>
          <div className='back-arrow'>
            <Icon name='arrow-left' />
          </div>
        </Link>

        <div className='mosaic-online-content'>
          { joined ?

            <div className='players'>
              <div className='players-title'>Players: </div>
              {
                players.map(e => <div>{e.name} - {e.lives}</div>)
              }
            </div> :

            gameIsOver ?

            <div className='players'>
              <div className='players-title'>You have lost.</div>
            </div> :

            <div className=''>
              <div className='name-input'>
                <input ref='playerName' name='name' placeholder='Enter your name'/> 
              </div>
              <Btn onClick={this.connectHandler}>Join free room</Btn>
            </div>
          }
        </div>
        {/*<MemoryMosaic />*/}
        { gameIsStarted && 
          <MemoryMosaic 
            {...gameData}
            onLevelSuccess={this.onLevelSuccess}
            onLevelFail={this.onLevelFail}
          /> 
        }
      </div>
    )
  }
}

const connected = socketConnect(MMOnline)
console.log('connected', connected)
export default connected
