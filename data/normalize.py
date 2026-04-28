def normalize_offer(job):
    company = job.get("smallCompany") or {}
    return {
        "title": job.get("title"),
        "description": job.get("descriptionPreview"),
        "company_id": company.get("id") or job.get("companyId"),
        "company_name": company.get("companyName"),
        "location": job.get("location"),
        "date": job.get("publishDate"),
        "salary": job.get("salary"),
        "salary_min": job.get("salaryMin"),
        "salary_max": job.get("salaryMax"),
        "salary_currency": job.get("salaryCurrency"),
        "remuneration": job.get("remuneration"),
    }