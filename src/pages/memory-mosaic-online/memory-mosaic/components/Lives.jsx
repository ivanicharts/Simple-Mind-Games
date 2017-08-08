import React from 'react';
import Icon from 'react-fontawesome';
import cn from 'classnames';

const createArray = (len, fn) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr[i] = fn(i);
  }
  console.log('arr', arr);
  return arr;
}

// add animation

export default ({count, alive}) => (
  <div className='lives'>
    {createArray(count, (i) => (
      <Icon 
        className={cn({hidden: i < count - alive})}
        key={i} 
        name='heart'/>
    ))}
  </div>
);
