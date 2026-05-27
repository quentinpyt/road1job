export type ProfileMe = {
  id: number;
  email: string;
  name: string | null;
  surname: string | null;
  age?: number | null;
  address?: string | null;
  Schools?: string | null;
  Projects?: string | null;
  Technologies?: string | null;
  Skills?: string | null;
};

export default async function getProfileMe() {
  const response = await fetch(process.env.NEXT_PUBLIC_URL_API_PROFILE_ME ?? "http://localhost:3001/profile/me", {
    credentials: "include",
  });

  return response.json();
}