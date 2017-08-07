import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'
import { Link } from 'react-router-dom'

import MemoryMosaic from './memory-mosaic'

export default class extends PureComponent {


  render = () => (
    <div className='memory-mosaic-wrapper'>

      <div className='back-arrow'>
        <Link to='/'>
          <Icon name='arrow-left' />
        </Link>
      </div>
      <MemoryMosaic />
      
    </div>
  )
}