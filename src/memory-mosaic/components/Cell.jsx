import React from 'react';

export default ({onClick, highlighted=false, size=4, keyValue}) => (
	<div
		key={keyValue} 
		style={{
			border: '1px solid #2d2d2d',
	    minWidth: `${100 / size}%`,
	    minHeight: `${100 / size}%`,
	    background: highlighted ? '#1abc9c' : '#ecf0f1',
	    cursor: 'pointer'
		}}
		onClick={onClick}>
		
	</div>
)