import Create from "@/components/form/notes/Create";
import Delete from "@/components/form/notes/Delete";
import Update from "@/components/form/notes/Update";
import Modal from "@/components/modal";
import { UseMutation } from "@/hooks/useMutation";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ dataNotes }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const { mutationData } = UseMutation();
  const router = useRouter();

  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  console.log(notes);

  const onChangeFormNotes = (e) => {
    const { name, value } = e.target;
    setNotes({ ...notes, [name]: value });
  };

  const handleSubmitCreateNote = async () => {
    const response = await mutationData({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
      payload: notes,
    });
    if (response?.success) {
      setShowModal(false);
      router.reload();
    }
  };

  const handleSubmitUpdate = async () => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
      method: "PATCH",
      payload: notes,
    });
    if (response?.success) {
      setShowModalUpdate(false);
      router.reload();
    }
  };

  const handleSubmitDelete = async () => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
      method: "DELETE",
    });

    if (response?.success) {
      setShowModalDelete(false);
      router.reload();
    }
  };

  useEffect(() => {
    const fetchDataById = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
          );
          const data = await response.json();
          console.log(data.data);
          setNotes({
            title: data.data.title,
            description: data.data.description,
          });
        } catch (error) {
          console.error("Error fetching data by ID:", error);
        }
      }
    };

    fetchDataById();
  }, [id]);

  return (
    <Fragment>
      <div className="p-10 text-center container mx-auto bg-slate-800/20">
        <article className="flex flex-col w-full">
          <h1 className=" font-bold text-3xl text-center">
            Quiz Pekan ke-3 Sanber Bootcamp
          </h1>
          <div className=" flex justify-end ">
            <button
              onClick={() => {
                setShowModal(true);
                setNotes({
                  title: "",
                  description: "",
                });
              }}
              className="bg-gray-700 rounded-xl p-2 flex justify-center items-center h-10"
            >
              Tambah Note
            </button>
          </div>
        </article>
        <article className="flex justify-around items-center gap-3 flex-wrap mt-10">
          {dataNotes.data?.map((data) => {
            return (
              <section className=" rounded-xl gap-2 flex flex-col justify-between text-gray-800 p-5 h-[300px] w-80 overflow-auto  bg-white">
                <h3 className=" text-xl font-bold underline-offset-1">
                  {data.title}
                </h3>
                <p className=" text-gray-600 text-justify mt-2">
                  {data.description}
                </p>
                <div className=" justify-self-end gap-2 flex justify-center items-center">
                  <button
                    onClick={() => {
                      setShowModalUpdate(true);
                      setId(data.id);
                    }}
                    className=" border border-blue-800 p-2 rounded-xl"
                  >
                    Update Note
                  </button>
                  <button
                    onClick={() => {
                      setShowModalDelete(true);
                      setId(data.id);
                    }}
                    className=" bg-red-800 p-2 rounded-xl text-white"
                  >
                    Delete Note
                  </button>
                </div>
              </section>
            );
          })}
        </article>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <Create
          onClose={() => setShowModal(false)}
          onFormChange={onChangeFormNotes}
          onCreate={handleSubmitCreateNote}
        />
      </Modal>
      <Modal
        isVisible={showModalUpdate}
        onClose={() => setShowModalUpdate(false)}
      >
        <Update
          onClose={() => setShowModalUpdate(false)}
          onFormChange={onChangeFormNotes}
          notes={notes}
          onUpdate={handleSubmitUpdate}
        />
      </Modal>
      <Modal
        isVisible={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <Delete
          onClose={() => setShowModalDelete(false)}
          notes={notes}
          onDelete={handleSubmitDelete}
        />
      </Modal>
    </Fragment>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const dataNotes = await res.json();
  return { props: { dataNotes } };
}
