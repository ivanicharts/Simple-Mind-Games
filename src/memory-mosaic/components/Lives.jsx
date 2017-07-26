import React from 'react';
import Icon from 'react-fontawesome';

const createArray = (len, fn) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = fn(i);
  }
  console.log('arr', arr);
  return arr;
}

// add animation

export default ({count}) => (
  <div className='lives'>
    {createArray(count, (i) => (
      <Icon key={i} name='heart'/>
    ))}
  </div>
);
