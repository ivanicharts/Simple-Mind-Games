import React from 'react';

export default ({keyValue, height, children}) => (
	<div
		style={{

	    height: `${100 / height}%`
		}}
		className='row'
		key={keyValue}>
		{children}
	</div>
)
