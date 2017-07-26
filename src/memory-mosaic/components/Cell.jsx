import React from 'react';
import Icon from 'react-fontawesome';

export default ({onClick, highlighted=false, size=4, keyValue, last, e}) => (
  <div
    key={keyValue}
    className='cell'
    style={{
      minWidth: `${100 / size}%`,
      minHeight: `${100 / size}%`,
      background: highlighted ? '#4EE9D9' : '#fff'
    }}
    onClick={onClick}>
      {last && <Icon name='check' />}
  </div>
);
