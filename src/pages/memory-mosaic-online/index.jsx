import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'
import { Link } from 'react-router-dom'
import { socketConnect } from 'socket.io-react'

import MemoryMosaic from 'shared/games/memory-mosaic'

class MMOnline extends PureComponent {

  componentDidMount = () => this.props.socket.emit('connectMess', 'yolo')

  render = () => (
    <div className='memory-mosaic-wrapper'>
      <Link to='/'>
        <div className='back-arrow'>
          <Icon name='arrow-left' />
        </div>
      </Link>
      <MemoryMosaic />
    </div>
  )
}

export default socketConnect(MMOnline)
