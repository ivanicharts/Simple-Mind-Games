import React, { PureComponent } from 'react'
import Icon from 'react-fontawesome'

import Modal from 'shared/modals/dark'

export default class extends PureComponent {

	state = {
		showModal: false,
    selectedGame: {
      title: 'Memory Mosaic'
    }
	}

	openHandler = () => this.setState({showModal: true})
	closeHandler = () => this.setState({showModal: false})

	render = () => (
		<main className='content-wrapper'>
		<section>
			Available games:
		</section>

		
		{
      this.state.showModal &&
			<Modal onClose={this.closeHandler}>
        <Icon className='item-caption' name='first-order' />
        <h1>{this.state.selectedGame.title}</h1>

        <p>More Content. Anything goes here</p>
	    </Modal>
    }

		<section className='list'>
			<div onClick={this.openHandler} className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
			<div className='list-item'>
				<Icon className='item-caption' name='first-order' />
				<div>Memory Mosaic</div>
			</div>
		</section>
	</main>
	)
}