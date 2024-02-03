import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <article>
        <h1 className=" font-bold text-3xl">Quiz Pekan ke-3 Sanber Bootcamp</h1>
      </article>
    </main>
  );
}
