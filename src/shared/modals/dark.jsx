import React from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog'

export default ({onClose, children}) => (
  <ModalContainer onClose={onClose}>
    <ModalDialog onClose={onClose}>
      {children}
    </ModalDialog>
  </ModalContainer>
)