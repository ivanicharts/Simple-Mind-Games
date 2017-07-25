import React from 'react';

export default ({keyValue, height, children}) => ( console.log('children', children),
	<div 
		style={{
			display: 'flex',
  		justifyContent: 'center',
	    width: '100%',
	    height: `${100 / height}%`
		}}
		key={keyValue}>
		{children}
	</div>
)