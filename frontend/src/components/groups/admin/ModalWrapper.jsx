import React from 'react'

/**
 * @param {Function} onClose callback function to close the modal
 * @param {Function} onSubmit optional callback for form submission
 * @param {string} errorMessage optional error message to display
 * @param {React.ReactNode} children content to render inside the modal
 * @param {string} submitButtonText optional text for submit button (if not provided, no submit button is rendered)
 */
export default function ModalWrapper({ onClose, onSubmit, errorMessage, children, submitButtonText }) {
  const handleSubmit = (e) => {
    if (onSubmit) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  const content = (
    <>
      <div className="auth-fields">
        {errorMessage && (
          <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>
            {errorMessage}
          </div>
        )}
        {children}
      </div>
      {submitButtonText && (
        <button className="auth-submit" type="submit">
          {submitButtonText}
        </button>
      )}
      <button type="button" onClick={onClose} className="close-signin-btn" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" className="close-btn" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </>
  )

  return (
    <div className="signin open">
      {onSubmit ? (
        <form className="auth-modal" onSubmit={handleSubmit}>
          {content}
        </form>
      ) : (
        <div className="auth-modal">
          {content}
        </div>
      )}
    </div>
  )
}
