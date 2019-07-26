import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { Button } from 'components'
import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalConfirm = ({ onConfirm, options }) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm()
    }
  }

  return (
    <Modal show>
      {options.title && (
        <Modal.Header>
          <Modal.Title>{options.title}</Modal.Title>
        </Modal.Header>
      )}
      {options.text && <Modal.Body>{options.text}</Modal.Body>}
      <Modal.Footer>
        <Button outline="true" onClick={() => handleConfirm(false)}>
          No
        </Button>
        <Button onClick={() => handleConfirm(true)}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default ModalConfirm
