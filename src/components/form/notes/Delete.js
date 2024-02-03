const Delete = ({ notes, onDelete, onClose }) => {
  return (
    <section className="text-black">
      <h1 className="text-2xl text-center font-bold">Update Note</h1>
      <hr className="my-2" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2  ">
          <label className=" text-center text">
            Apakah Anda Yakin Ingin menghapus Note{" "}
          </label>
          <input
            name="title"
            placeholder="Masukan Title..."
            readOnly
            className=" border-none bg-gray-300 border outline-none p-2 rounded-sm"
            value={notes.title}
          />
        </div>

        <div className="flex justify-center items-center mx-auto">
          <button
            onClick={() => {
              onClose();
            }}
            className="bg-grey p-[10px] w-[200px] mr-[12px] gap-[10px] text-red-700 border-solid border-2 border-red-700 rounded"
          >
            Kembali
          </button>
          <button
            onClick={onDelete}
            className="p-[10px] w-[200px] bg-red-700 gap-[10px] text-white rounded"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </section>
  );
};

export default Delete;
