import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'
import { Link } from 'react-router-dom'

import Modal from 'shared/modals/dark'
import { games } from 'data.json'

export default class extends PureComponent {

	state = {
		showModal: false,
    game: {}
	}

	openHandler = (game) => () => this.setState({game, showModal: true})
	closeHandler = () => this.setState({showModal: false})

	render = () => (
		<main className='content-wrapper'>
		<section>
			Available games:
		</section>

		
		{
      this.state.showModal &&
			<Modal onClose={this.closeHandler}>
        <div className='item-info'>
          <Icon className='item-caption' name='empire' />
          <p className='game-name'>{this.state.game.label}</p>

          <div className='block'>
            <h4 className='game-description'>Description:</h4>
            <p className='text'>{this.state.game.description}</p>
          </div>
          
          <div className='block'>
            <h4 className='game-description'>Rules:</h4>
            <p className='text'>{this.state.game.rules}</p>
          </div>
                  
          {this.state.game.singleplayer && <Link to='/memory'><button className='select-btn'>Single player</button></Link>}
          {this.state.game.multiplayer && <button className='select-btn'>Multiplayer</button>}
        </div>
	    </Modal>
    }

		<section className='list'>
			{
        games.map((g) => (
          <div onClick={this.openHandler(g)} className='list-item'>
            <Icon className='item-caption' name='first-order' />
            <div>{g.label}</div>
          </div>
        ))
      }
		</section>
	</main>
	)
}