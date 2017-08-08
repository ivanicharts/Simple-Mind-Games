import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'
import { Link } from 'react-router-dom'

import MemoryMosaic from 'shared/games/memory-mosaic'

class MMOnline extends PureComponent {

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

export default MMOnline
