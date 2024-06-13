import "./Modal.css"; // Make sure to style your modal

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
