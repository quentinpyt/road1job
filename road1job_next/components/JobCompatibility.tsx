"use client";

import { useEffect, useState } from "react";
import { useUserSkills, type CompatibilityResult } from "@/hooks/useUserSkills";

interface JobCompatibilityProps {
  jobId: number;
}

export function JobCompatibility({ jobId }: JobCompatibilityProps) {
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const { getJobCompatibility } = useUserSkills();

  useEffect(() => {
    fetchCompatibility();
  }, [jobId]);

  const fetchCompatibility = async () => {
    try {
      setLoading(true);
      const result = await getJobCompatibility(jobId);
      setCompatibility(result);
    } catch (error) {
      console.error("Error fetching compatibility:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="skeleton h-24 w-full"></div>;
  }

  if (!compatibility) {
    return (
      <div className="alert alert-info">
        <span>Veuillez configurer vos compétences pour voir la compatibilité</span>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    if (score >= 40) return "Moyen";
    return "Faible";
  };

  return (
    <div className="card bg-base-100 shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Compatibilité avec le poste</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-4">
            <div
              className={`text-4xl font-bold ${getScoreColor(
                compatibility?.score || 0
              )}`}
            >
              {compatibility?.score || 0}%
            </div>
            <div>
              <p className="text-sm text-gray-600">Score de compatibilité</p>
              <p className={`font-semibold ${getScoreColor(compatibility?.score || 0)}`}>
                {getScoreLabel(compatibility?.score || 0)}
              </p>
            </div>
          </div>
        </div>

      </div>

     
      </div>
  );
}
