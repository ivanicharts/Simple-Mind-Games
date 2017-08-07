import React from 'react'
import Particles from 'react-particles-js'

const particlesParams = {
	particles: {
		number: {
			value: 35,
			density: {enable: false}
		},
		color: {
			value: '#64367F'
		},
		size: {value: 5, random: true},
		line_linked: {
			enable: false
		}
	}
}

export default () => (
  <header className='home-header'>
    <div className='top-nav'>
    	<h1 className='logo'> mind games </h1>
    		<a>Sign up</a>
    </div>
    <div className='header-text'>
    	<Particles 
    		height={400}
    		params={particlesParams}
    		style={{
    			maxWidth: '100%'
    		}}
    	/>
      <span>
        Thank you for coming :)
      </span>
    </div>
  </header>
)
