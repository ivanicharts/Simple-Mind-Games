import React, { PureComponent } from 'react'

import Header from './components/header'
import Content from './components/content'

import './style.scss'

class Home extends PureComponent {

	render = () => (
		<div className='home-wrapper'>
			<Header />
			<Content />
		</div>
	)
}

export default Home