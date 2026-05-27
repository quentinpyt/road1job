const API_BASE_URL = (() => {
  const url = process.env.NEXT_PUBLIC_URL_API || "http://localhost:3001";
  // Extract base URL without path
  const urlObj = new URL(url);
  return `${urlObj.protocol}//${urlObj.host}`;
})();

export type TopSkill = {
  name: string;
  count: number;
};

export async function getTopSkills(): Promise<{ success: boolean; skills: TopSkill[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/stats/top-skills`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top skills: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top skills:", error);
    return { success: false, skills: [] };
  }
}
