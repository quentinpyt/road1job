"use client";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedWord = searchWord.trim();

    if (!trimmedWord) {
      return;
    }

    router.push(`/search/${encodeURIComponent(trimmedWord)}`);
  }

  return (
    <div>
      <header>
        <NavBar />
      </header>

      <section className="w-full h-screen flex flex-col items-center justify-center text-center gap-6 relative">
        <TypeAnimation
          sequence={[
            'Trouve ton chemin dans le développement',
            3000,
            'Développe tes compétences',
            3000,
            'Accède à de nouvelles opportunités',
            3000,
            'Road1job, ton guide vers le succès professionnel',
            3000,
          ]}
          wrapper="h1"
          repeat={Infinity}
          className="text-6xl font-bold mb-4"
        />

        <div className="w-full md:w-1/2 lg:w-1/3 bg-[#2C1E4F] rounded-full p-6 flex items-center justify-center z-10">
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-between items-center gap-2 w-full"
          >
            <input
              type="text"
              placeholder="Cherchez un thème, un mot-clé, une entreprise..."
              value={searchWord}
              onChange={(event) => setSearchWord(event.target.value)}
              className="text-white flex w-full rounded-full h-full bg-transparent focus:outline-none "
            />
            <button type="submit">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-9 text-center"
              />
            </button>
          </form>
        </div>
        <div className="bubbles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
    </div>
  );
}
