"use client";

import { useEffect, useState } from "react";
import { getTopSkills, type TopSkill } from "@/app/api/gettopskills";
import getProfileMe, { type ProfileMe } from "@/app/api/profileme";

export default function StatisticsClient() {
  const [topSkills, setTopSkills] = useState<TopSkill[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileMe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, profileData] = await Promise.all([
          getTopSkills(),
          getProfileMe(),
        ]);

        if (skillsData.success) {
          setTopSkills(skillsData.skills);
        }

        if (profileData?.success && profileData?.user) {
          setProfile(profileData.user);
          // Parse user skills - they're stored as comma-separated string or JSON
          if (profileData.user.Skills) {
            try {
              const skills = typeof profileData.user.Skills === 'string'
                ? profileData.user.Skills.split(',').map((s: string) => s.trim())
                : Array.isArray(profileData.user.Skills) ? profileData.user.Skills : [];
              setUserSkills(skills);
            } catch {
              setUserSkills([]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const matchedSkills = topSkills.filter((skill) =>
    userSkills.some((userSkill) =>
      userSkill.toLowerCase().includes(skill.name.toLowerCase()) ||
      skill.name.toLowerCase().includes(userSkill.toLowerCase())
    )
  );

  const maxCount = topSkills.length > 0 ? topSkills[0].count : 1;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f46e5] mx-auto mb-4"></div>
          <p className="text-[var(--app-fg)]">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[var(--app-bg)] min-h-full text-[var(--app-fg)]">
      <h1 className="text-3xl font-bold mb-8">Statistiques du Marché</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Skills */}
        <div className="lg:col-span-2 bg-[var(--app-card-bg)] rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Top Skills Demandés</h2>
          <div className="space-y-4">
            {topSkills.slice(0, 20).map((skill, index) => {
              const percentage = (skill.count / maxCount) * 100;
              const isMatched = matchedSkills.some(
                (s) =>
                  s.name.toLowerCase() === skill.name.toLowerCase()
              );

              return (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400 w-6">
                        {index + 1}
                      </span>
                      <span className="font-medium">{skill.name}</span>
                      {isMatched && (
                        <span className="px-2 py-1 bg-[#4f46e5]/20 text-[#4f46e5] text-xs rounded font-medium">
                          ✓ Vous avez
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{skill.count}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isMatched ? "bg-[#4f46e5]" : "bg-gray-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Skills */}
          <div className="bg-[var(--app-card-bg)] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Vos Compétences</h2>
            {userSkills.length > 0 ? (
              <div className="space-y-2">
                {userSkills.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-2 bg-[#4f46e5]/10 text-[#4f46e5] rounded text-sm font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Aucune compétence ajoutée à votre profil
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="bg-[var(--app-card-bg)] rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Résumé</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Vos compétences</p>
                <p className="text-2xl font-bold text-[#4f46e5]">
                  {userSkills.length}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Correspondance</p>
                <p className="text-2xl font-bold text-[#4f46e5]">
                  {matchedSkills.length}
                </p>
              </div>
              {userSkills.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Couverture du marché</p>
                  <p className="text-2xl font-bold text-[#4f46e5]">
                    {Math.round(
                      (matchedSkills.length / topSkills.length) * 100
                    )}
                    %
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
