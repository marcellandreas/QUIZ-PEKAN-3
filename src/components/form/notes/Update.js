const Update = ({ onFormChange, notes, onClose, onUpdate }) => {
  return (
    <section className="text-black">
      <h1 className="text-2xl text-center font-bold">Update Note</h1>
      <hr className="my-2" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2  ">
          <label>Title</label>
          <input
            name="title"
            placeholder="Masukan Title..."
            className=" border-none bg-gray-300 border outline-none p-2 rounded-sm"
            onChange={onFormChange}
            value={notes.title}
          />
        </div>
        <div className="flex flex-col gap-2  ">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Masukan Description..."
            className=" border-none bg-gray-300  outline-none p-2 rounded-sm"
            onChange={onFormChange}
            value={notes.description}
          />
        </div>
        <div className="flex justify-center items-center mx-auto">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-grey p-[10px] w-[200px] mr-[12px] gap-[10px] text-blue-700 border-solid border-2 border-blue-700 rounded"
          >
            Kembali
          </button>
          <button
            onClick={onUpdate}
            className="p-[10px] w-[200px] bg-blue-700 gap-[10px] text-white rounded"
          >
            Simpan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Update;
