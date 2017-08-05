import React, { PureComponent } from 'react'

import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'

import './style.scss'

class Home extends PureComponent {

	render = () => (
		<div className='home-wrapper'>
			<Header />
			<Content />
      <Footer />
		</div>
	)
}

export default Home