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
    joined: false
  }

  componentDidMount = () => {
    this.props.socket.on('start game', (data) => {
      console.log('start game', data)
    })

    this.props.socket.on('joined player', (players) => {
      this.setState({ players: JSON.parse(players), joined: true })
      console.log('joined new player ' + players)
    })
  }

  componentWillUnmount = () => {
    this.props.socket.removeAllListeners()
  }

  connectHandler = () => {
    this.props.socket.emit('join room', this.refs.playerName.value)
  }
  // this.props.socket.emit('join room', 'me')

  render = () => {
    const { joined, players } = this.state

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
                Object.values(players).map(e => <div>{e}</div>)
              }
            </div> :

            <div>
              <div>
                <input ref='playerName' name='name' placeholder='Enter your name'/> 
              </div>
              <Btn onClick={this.connectHandler}>Join free room</Btn>
            </div>
          }
        </div>
        {/*<MemoryMosaic />*/}
      </div>
    )
  }
}

const connected = socketConnect(MMOnline)
console.log('connected', connected)
export default connected
