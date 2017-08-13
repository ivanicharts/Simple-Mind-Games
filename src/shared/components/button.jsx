import React from 'react'

const style = {
  color: '#2d2d2d',
  padding: '7px 17px',
  background: '#fff',
  cursor: 'pointer',
  border: 0,
  outline: 0
}

export default ({children, onClick}) => (
  <button onClick={onClick} style={style}>{children}</button>
)