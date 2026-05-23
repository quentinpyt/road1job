"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";



export default function NavBar() {
  const router = useRouter();
  function goLoginPage(){
  
  router.push("/Login");
}
  return (
    <div className="flex items-center  justify-between p-4 fixed w-full z-10 bg-[#1D152F]">
      <div className="hidden md:flex w-10 h-10 flex items-center gap-1 ">
        <img src="/logo_1.png" alt="logo"></img>
        <span>Road1Job</span>
      </div>
      <form className="flex items-center w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Cherchez un thème, un mot-clé..."
          className="md:block w-full text-white rounded-full p-5 bg-[#2C1E4F] focus:outline-none focus:ring-2 focus:ring-[#5A3EA0] focus:ring-opacity-50"
        ></input>
      </form>
      <div className="hidden md:flex items-center gap-4 hover:rounded-full hover:bg-[#2C1E4F] p-4 transition-colors duration-300 cursor-pointer" onClick={goLoginPage}>
        <a className="text-md">Se connecter</a>
        <div className="avatar">
          <FontAwesomeIcon
            icon={faUser}
            className="profile"
            style={{ width: "20px" }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
