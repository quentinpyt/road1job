
"use client";

import logingoogle from "@/app/api/logingoogle";
import EmailInput from "@/components/ui/emailinput";
import PasswordInput from "@/components/ui/passwordInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Childprops = {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardLogin({setLogin}: Childprops) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL_API_LOGIN ?? "http://localhost:3001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.message ?? payload?.error ?? "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (submitError) {
      setError("Unable to connect right now.");
    } finally {
      setLoading(false);
    }
  }

  return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full mx-auto">
      <img src="/logo_1.png" alt="logo" className="w-20 h-20 mx-auto mb-4 md:hidden" />
        <form onSubmit={handleLogin} className="form-box flex justify-beetween flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
          <h1 className="text-xl font-bold">Se connecter</h1>
          
          <div className="w-full">
            <EmailInput value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div className="w-full">
            <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error ? (
            <p className="text-sm text-red-600 text-center">{error}</p>
          ) : null}

          <button type="button" className="btn btn-active btn-primary" onClick={() => setLogin(false)}>
            Je n'ai pas encore de compte
          </button>

          <div className="actions flex flex-col md:flex-row gap-4">
            <button type="button" className="btn bg-white text-black border-[#e5e5e5]" onClick={logingoogle}>
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
            </button>
            <button type="submit" className="btn btn-primary text-black border-[#e5e5e5]" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>
      </div>)
}