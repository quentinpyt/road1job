'use client';

import { useState } from "react";
import CardLogin from "@/compenent/Login_Compenent/CardLogin";
import CardRegister from "@/compenent/Login_Compenent/CardRegister";

export default function AuthCompose() {
  const [login, setLogin] = useState(true);
  if (login) {
    return (
      <CardLogin setLogin={setLogin} />
    )
  } else {
    return (
        <CardRegister setLogin={setLogin} />
    )
  }
}
