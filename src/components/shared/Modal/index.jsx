import React from 'react'
import ReactModal from 'react-modal'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './Modal.scss'

const Modal = props => {
  const {
    children,
    btnClose,
    disableOverlay,
    closeOnOverlayClick,
    onClose,
    className,
    isOpen
  } = props

  return (
    <ReactModal
      {...props}
      isOpen={isOpen}
      overlayClassName={classnames('modal-overlay vertical-outer', {
        'modal-overlay--disabled': disableOverlay
      })}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      onRequestClose={onClose}
      className={`modal__wrap ${className || ''}`}
      parentSelector={() => document.body}
    >
      {btnClose && (
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <i className="icon icon-close" />
        </button>
      )}
      <div className="modal__body">{children}</div>
    </ReactModal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  btnClose: PropTypes.bool,
  disableOverlay: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  className: PropTypes.string
}

export default Modal
