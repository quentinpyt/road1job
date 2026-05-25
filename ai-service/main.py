from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List

app = FastAPI(title="AI Compatibility Service")

class CompatibilityRequest(BaseModel):
    user_skills: str
    job_skills: List[dict]

class CompatibilityResponse(BaseModel):
    score: int
    user_skills_count: int
    job_skills_count: int
    matched_skills: List[str]

def calculate_skills_compatibility(user_skills: str, job_skills: List[dict]) -> CompatibilityResponse:
    """Calculate compatibility between user skills and job skills using TF-IDF"""

    if not user_skills or not job_skills:
        return CompatibilityResponse(
            score=0,
            user_skills_count=0,
            job_skills_count=len(job_skills),
            matched_skills=[]
        )

    # Parse user skills - normalize: lowercase, strip whitespace
    user_skills_list = [s.strip().lower() for s in user_skills.split(",") if s.strip()]
    job_skills_list = [s["name"].strip().lower() for s in job_skills if s.get("name")]

    if not user_skills_list or not job_skills_list:
        return CompatibilityResponse(
            score=0,
            user_skills_count=len(user_skills_list),
            job_skills_count=len(job_skills_list),
            matched_skills=[]
        )

    # Calculate exact matches first
    matched_skills = [
        skill for skill in user_skills_list
        if any(
            skill == job_skill or skill in job_skill or job_skill in skill
            for job_skill in job_skills_list
        )
    ]

    exact_match_score = len(matched_skills) / len(job_skills_list) if job_skills_list else 0

    # If all skills match exactly, return 100%
    if exact_match_score == 1.0 and len(user_skills_list) >= len(job_skills_list):
        return CompatibilityResponse(
            score=100,
            user_skills_count=len(user_skills_list),
            job_skills_count=len(job_skills_list),
            matched_skills=matched_skills
        )

    # TF-IDF for partial matches
    try:
        vectorizer = TfidfVectorizer(analyzer='char', ngram_range=(2, 3))
        all_skills = user_skills_list + job_skills_list

        tfidf_matrix = vectorizer.fit_transform(all_skills)

        # Calculate cosine similarity between user and job skill vectors
        user_vector = tfidf_matrix[:len(user_skills_list)]
        job_vector = tfidf_matrix[len(user_skills_list):]

        # Mean similarity across all combinations
        similarities = cosine_similarity(user_vector, job_vector)
        tfidf_score = np.mean(similarities)

    except Exception as e:
        tfidf_score = exact_match_score

    # Combine scores (40% TF-IDF, 60% exact match for more weight on exact matches)
    final_score = int((tfidf_score * 0.4 + exact_match_score * 0.6) * 100)
    final_score = min(100, max(0, final_score))

    return CompatibilityResponse(
        score=final_score,
        user_skills_count=len(user_skills_list),
        job_skills_count=len(job_skills_list),
        matched_skills=matched_skills
    )

@app.post("/calculate-compatibility", response_model=CompatibilityResponse)
async def calculate_compatibility(request: CompatibilityRequest):
    """Calculate skills compatibility using TF-IDF"""
    try:
        result = calculate_skills_compatibility(request.user_skills, request.job_skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating compatibility: {str(e)}")

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
