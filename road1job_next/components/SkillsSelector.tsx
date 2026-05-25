"use client";

import { useEffect, useState, useCallback } from "react";
import { useUserSkills, type Skill } from "@/hooks/useUserSkills";

const getBaseUrl = (url?: string) => {
  if (!url) return "http://localhost:3001";
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch {
    return "http://localhost:3001";
  }
};

export function SkillsSelector() {
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { userSkills, getUserSkills, updateUserSkills } = useUserSkills();

  useEffect(() => {
    fetchAvailableSkills();
    loadUserSkills();
  }, []);

  const fetchAvailableSkills = async () => {
    try {
      setLoading(true);
      const baseUrl = getBaseUrl(process.env.NEXT_PUBLIC_URL_API);
      const response = await fetch(
        `${baseUrl}/jobs/skills`
      );

      if (response.ok) {
        const data = await response.json();
        setAvailableSkills(data.skills);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserSkills = async () => {
    try {
      const skills = await getUserSkills();
      if (skills) {
        const skillNames = skills
          .split(",")
          .map((s: string) => s.trim().toLowerCase());
        const selected = availableSkills.filter((skill) =>
          skillNames.includes(skill.name.toLowerCase())
        );
        setSelectedSkills(selected);
      }
    } catch (error) {
      console.error("Error loading user skills:", error);
    }
  };

  const toggleSkill = (skill: Skill) => {
    setSelectedSkills((prev) => {
      const isSelected = prev.some((s) => s.id === skill.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== skill.id);
      } else {
        return [...prev, skill];
      }
    });
  };

  const handleSaveSkills = async () => {
    try {
      setSaving(true);
      const skillsString = selectedSkills
        .map((s) => s.name)
        .join(", ");

      const success = await updateUserSkills(skillsString);
      if (success) {
        console.log("Skills saved successfully");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
    } finally {
      setSaving(false);
    }
  };

  const filteredSkills = availableSkills.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-4">Chargement des compétences...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sélectionnez vos compétences</h2>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">
          Compétences sélectionnées ({selectedSkills.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.length > 0 ? (
            selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="badge badge-primary gap-2 p-3"
              >
                {skill.name}
                <button
                  onClick={() => toggleSkill(skill)}
                  className="text-xs font-bold hover:opacity-70"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucune compétence sélectionnée</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher une compétence..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full bg-white text-black"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">
          {filteredSkills.length} compétence{filteredSkills.length > 1 ? 's' : ''} trouvée{filteredSkills.length > 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto p-2 border rounded-lg">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => {
              const isSelected = selectedSkills.some((s) => s.id === skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill)}
                  className={`badge p-2 cursor-pointer transition-all ${
                    isSelected
                      ? "badge-primary"
                      : "badge-outline hover:badge-primary"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 w-full text-center py-4">
              Aucune compétence trouvée
            </p>
          )}
        </div>
      </div>

      <a
        onClick={handleSaveSkills}
        className="btn btn-primary w-full"
        href="/dashboard"
      >
        Sauvegarder et revenir au dashboard
      </a>
    </div>
  );
}

