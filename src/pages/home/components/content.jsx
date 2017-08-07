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

	render = () => {
    const {game} = this.state

    return (
      <main className='content-wrapper'>
      <section>
        Available games:
      </section>

      
      {
        this.state.showModal &&
        <Modal onClose={this.closeHandler}>
          <div className='item-info'>
            {
              this.state.game.image ?
              <img src={game.image} /> :
              <Icon className='item-caption' name='empire' />
            }
            <p className='game-name'>{game.label}</p>

            <div className='block'>
              <h4 className='game-description'>Description:</h4>
              <p className='text'>{game.description}</p>
            </div>
            
            <div className='block'>
              <h4 className='game-description'>Rules:</h4>
              <p className='text'>{game.rules}</p>
            </div>
                    
            {game.singleplayer && <Link to='/memory'><button className='select-btn'>Single player</button></Link>}
            {game.multiplayer && <button className='select-btn'>Multiplayer</button>}
          </div>
        </Modal>
      }

      <section className='list'>
        {
          games.map((g) => (
            <div onClick={this.openHandler(g)} className='list-item'>
              {
                g.image ? 
                <img className='item-caption dark-bg' src={g.image} /> :
                <Icon className='item-caption' name='first-order' />
              }
              <div>{g.label}</div>
            </div>
          ))
        }
      </section>
    </main>
    )
  }
}