import { useState, useCallback } from "react";

export interface Skill {
  id: number;
  name: string;
}

export interface CompatibilityResult {
  score: number;
  userSkillsCount: number;
  jobSkillsCount: number;
  matchedSkills: string[];
}

const getBaseUrl = (url?: string) => {
  if (!url) return "http://localhost:3001";
  return url.replace(/\/[^/]*$/, "");
};

export function useUserSkills() {
  const [userSkills, setUserSkills] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getUserSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PROFILE}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserSkills(data.user?.Skills || "");
        return data.user?.Skills || "";
      }
      return "";
    } catch (error) {
      console.error("Error fetching user skills:", error);
      return "";
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserSkills = useCallback(
    async (skills: string) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_PROFILE}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Skills: skills }),
          }
        );

        if (response.ok) {
          setUserSkills(skills);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating user skills:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getJobCompatibility = useCallback(
    async (jobId: number): Promise<CompatibilityResult | null> => {
      try {
        const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_URL_API);
        const response = await fetch(
          `${baseUrl}/jobs/${jobId}/compatibility`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data.compatibility;
        }
        return null;
      } catch (error) {
        console.error("Error fetching compatibility:", error);
        return null;
      }
    },
    []
  );

  return {
    userSkills,
    setUserSkills,
    loading,
    getUserSkills,
    updateUserSkills,
    getJobCompatibility,
  };
}

