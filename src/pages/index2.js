import { Inter } from "next/font/google";
import Modal from "../../components/modals";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ dataNotes }) {
  const [showModalEditAdmin, setShowModalEditAdmin] = useState(false);
  const [showModalAddAdmin, setShowModalAddAdmin] = useState(false);
  const [showModalDelAdmin, setShowModalDelAdmin] = useState(false);
  console.log(dataNotes);
  return (
    <>
      <main
        className={`flex bg-gray-200/10 m-auto min-h-screen container flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <article className="flex flex-col w-full">
          <h1 className=" font-bold text-3xl text-center">
            Quiz Pekan ke-3 Sanber Bootcamp
          </h1>
          <div className=" flex justify-end ">
            <button
              onClick={() => {
                setShowModalAddAdmin(true);
              }}
              className="bg-gray-300 rounded-xl p-2 flex justify-center items-center h-10"
            >
              Tambah Note{" "}
              <span className=" bg-gray-100 flex justify-center items-center w-9 h-9 text-2xl rounded-full text-black font-extrabold">
                +
              </span>
            </button>
          </div>
        </article>

        <article className="flex justify-around items-center gap-3 flex-wrap mt-10">
          {dataNotes.data?.map((data) => {
            return (
              <section className=" rounded-xl text-gray-800 p-5 h-[300px] w-80 overflow-auto  bg-white">
                <h3 className=" text-xl font-bold underline-offset-1">
                  {data.title}
                </h3>
                <p className=" text-gray-600 text-justify mt-2">
                  {data.description}
                </p>
              </section>
            );
          })}
        </article>
      </main>
      <Modal
        isVisible={showModalAddAdmin}
        onClose={() => setShowModalAddAdmin(false)}
      ></Modal>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const dataNotes = await res.json();
  return { props: { dataNotes } };
}
