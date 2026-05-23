
"use client";
import EmailInput from "@/components/ui/emailinput";
import PasswordInput from "@/components/ui/passwordInput";  
import BtnConnection from "@/components/ui/BtnConnection";
import NameInput from "@/components/ui/NameInput";
type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CardRegister({setLogin}: Childprops) {
    return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full mx-auto">
        <img src="/logo_1.png" alt="logo" className="w-20 h-20 mx-auto mb-4 md:hidden"></img>
        <div className="form-box flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-xl font-bold">S'inscrire</h1>

          <div className="w-full">
            <NameInput placeholder="Nom" />
          </div>
          <div className="w-full">
            <NameInput placeholder="Prénom" />
          </div>
          
          <div className="w-full">
          <EmailInput />
          </div>
        
          <div className="w-full">
          <PasswordInput />
          </div>
            
        <div className="w-full">
          <button type="button" className="btn btn-active btn-primary " onClick={() => setLogin(true)}>
            J'ai déjà un compte
          </button>
        </div>
        <BtnConnection>
          S'inscrire
        </BtnConnection>
        </div>
    </div>
    );
    
}