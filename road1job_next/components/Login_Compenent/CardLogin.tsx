
"use client";

import logingoogle from "@/app/api/logingoogle";
import EmailInput from "@/components/ui/emailinput";
import PasswordInput from "@/components/ui/passwordInput";
import BtnConnection from "@/components/ui/BtnConnection";
type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardLogin({setLogin}: Childprops) {
    return(      
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full mx-auto">
      <img src="/logo_1.png" alt="logo" className="w-20 h-20 mx-auto mb-4 md:hidden"></img>
        <div className="form-box flex justify-beetween flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-xl font-bold">Se connecter</h1>
          
          <div className="w-full">
          <EmailInput />
          </div>

          <div className="w-full">
          <PasswordInput />
          </div>

          <button type="button" className="btn btn-active btn-primary " onClick={() => setLogin(false)}>
            Je n'ai pas encore de compte
          </button>

        <BtnConnection>
          Se connecter
        </BtnConnection>
        </div>
      </div>)
}