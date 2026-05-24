
"use client";
import EmailInput from "@/components/ui/emailinput";
import PasswordInput from "@/components/ui/passwordInput";  
import NameInput from "@/components/ui/NameInput";
import BtnConnection from "@/components/ui/BtnConnection";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CardRegister({setLogin}: Childprops) {
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setError("");
      setLoading(true);

      try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL_API_REGISTER ?? "http://localhost:3001/register", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, name, email, password }),
        });

        const payload = await response.json();

        if (!response.ok) {
          setError(payload?.message ?? payload?.error ?? "Registration failed");
          return;
        }

        router.push("/dashboard");
      } catch (submitError) {
        setError("Unable to connect right now.");
      } finally {
        setLoading(false);
      }
    }

    return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full mx-auto">
        <img src="/logo_1.png" alt="logo" className="w-20 h-20 mx-auto mb-4 md:hidden"></img>
        <form onSubmit={handleRegister} className="form-box flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-xl font-bold">S'inscrire</h1>

          <div className="w-full">
            <BtnConnection googleLabel={"S'inscrire avec Google"}>Inscription</BtnConnection>
          </div>

          <div className="w-full">
            <NameInput placeholder="Nom" name="name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="w-full">
            <NameInput placeholder="Prénom" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
          </div>
          
          <div className="w-full">
          <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
        
          <div className="w-full">
          <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          {error ? (
            <p className="text-sm text-red-600 text-center">{error}</p>
          ) : null}
            
        <div className="w-full flex flex-col items-center gap-4">
          <button type="button" className="btn btn-active btn-primary " onClick={() => setLogin(true)}>
            J'ai déjà un compte
          </button>
        </div>
        <button type="submit" className="btn btn-primary text-black border-[#e5e5e5]" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
        </form>
    </div>
    );
    
}