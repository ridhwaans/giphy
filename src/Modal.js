import './App.css';

//https://reactjs.org/docs/composition-vs-inheritance.html
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modalContainer displayBlock" : "modalContainer displayNone";
  
  return (
    <div className={showHideClassName}>
      <section className="modal">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;