import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

import './style.scss'

const styles = {
  backgroundColor: '#362d47',
  color: '#fff',
  borderRadius: '1px',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)'
}

export default ({onClose, children}) => (
  <ModalContainer className='modal-dark' onClose={onClose}>
    <ModalDialog topOffset={10} style={styles} className='modal-dark' onClose={onClose}>
      {children}
    </ModalDialog>
  </ModalContainer>
)