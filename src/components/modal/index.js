const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper-modal") {
      onClose();
    }
  };
  return (
    <section
      id="wrapper-modal"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col ">
        <div className="bg-white p-2  rounded">{children}</div>
      </div>
    </section>
  );
};

export default Modal;
