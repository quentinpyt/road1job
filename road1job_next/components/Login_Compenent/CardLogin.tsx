
"use client";

import logingoogle from "@/app/api/logingoogle";


type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardLogin({setLogin}: Childprops) {
    return(      
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full mx-auto">
      <img src="/logo_1.png" alt="logo" className="w-20 h-20 mx-auto mb-4 md:hidden"></img>
        <div className="form-box flex justify-beetween flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-xl font-bold">Se connecter</h1>
          
          <label className="input validator bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input type="email" placeholder="mail@site.com" 
          className="bg-white focus:outline-none "
          required />

        </label>
        <div className="validator-hint hidden">Entrer une adresse email valide</div>

        <label className="input validator bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <svg className="h-[1em] opacity-50 "  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="Password"
            minLength ={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            className="bg-white focus:outline-none "
          />
        </label>
        <p className="validator-hint hidden ">
          Password devrait contenir : <br />Minimum 8 characters <br />Au moins un chiffre <br />Au moins une lettre minuscule <br />Au moins une lettre majuscule
        </p>

          <button type="button" className="btn btn-active btn-primary " onClick={() => setLogin(false)}>
            Je n'ai pas encore de compte
          </button>

          <div className="actions flex flex-col md:flex-row gap-4">
            <button className="btn bg-white text-black border-[#e5e5e5]" onClick={logingoogle}>
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
            </button>
            <button className="btn btn-primary text-black border-[#e5e5e5]">
              <svg aria-label="Email icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="black"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
              Login with Email
            </button>
          </div>
        </div>
      </div>)
}