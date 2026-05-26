# Product Documentation - Road1Job

## 🎯 Market Analysis

### Target Market
**Primary**: Junior → Senior developers (0-15 years experience) in Europe
- **TAM**: ~2M developers in EU
- **SAM**: ~400K developers actively job hunting monthly
- **SOM (Year 1)**: 5K active users

### Market Gaps
| Problem | Existing Solution | Our Solution |
|---------|-------------------|--------------|
| **Job search pollution** | Search 5+ job boards | Single tech-focused platform |
| **Poor filtering** | Generic filters | Dev-specific (language, framework) |
| **Slow decision** | Manual profile matching | AI compatibility scoring |
| **Recruiter spam** | Millions of messages | Pre-filtered quality jobs |

### Competitive Landscape
| Competitor | Strength | Weakness |
|------------|----------|----------|
| **LinkedIn Jobs** | Massive audience | Generic, non-tech focused |
| **Stack Overflow Jobs** | Dev audience | Deprecated (closed 2021) |
| **GitHub Jobs** | Dev audience | Basic features |
| **Indeed** | Job volume | Poor UX for devs |
| **Elance/Upwork** | Freelance jobs | Not permanent positions |

**Our Advantage**: Dev-first design + AI matching + European focus

---


## 🖼️ UI/UX Architecture

### User Flows

#### 1️⃣ Discovery Flow (Anonymous User)
```
Landing page
    ↓
Search jobs (no login required)
    ↓
View job details
    ↓
[Sign up / Apply]
```

#### 2️⃣ Authentication Flow
```
Sign up
    ↓
Email + password OR Google OAuth
    ↓
Profile setup (skills, experience)
    ↓
Dashboard
```

#### 3️⃣ Job Search Flow
```
Dashboard
    ↓
View results with AI match score
    ↓
Save to favorites OR apply (external redirect)
```

### Key Screens (Wireframes)

#### Dashboard Screen
```
┌─────────────────────────────────────┐
│ Road1Job          [Search] [User]   │
├─────────────────────────────────────┤
│ Filters:  [Location] [Tech] [Type]  │
│ Sort: [Recent] [Trending] [Saved]   │
├─────────────────────────────────────┤
│ ┌─ React Developer - TechCorp ┐     │
│ │ Paris, CDI, 45-60k EUR      │     │
│ │ Skills: React(4), TS(3)     │     │
│ │ Match: 87% ⭐ [Save] [Apply] │     │
│ └─────────────────────────────┘     │
│ ┌─ Python Backend - Startup ┐       │
│ │ Remote, CDI, 50-70k EUR    │       │
│ │ Skills: Python(4), Django(3)│      │
│ │ Match: 72% ⭐ [Save] [Apply] │     │
│ └─────────────────────────────┘     │
└─────────────────────────────────────┘
```

#### Job Detail Screen
```
┌──────────────────────────────────────┐
│ React Developer ← Back               │
│ TechCorp                             │
├──────────────────────────────────────┤
│ Location: Paris, France (Remote)     │
│ Type: CDI                            │
│ Experience: 3+ years                 │
│ Salary: 45,000 - 60,000 EUR          │
│                                      │
│ Your Match: 87% ✅                   │
│ Matching: React, TypeScript, CSS     │
│ Missing: GraphQL, Node.js            │
│                                      │
│ About:                               │
│ [Full job description...]            │
│                                      │
│ Required Skills:                     │
│ • React (Advanced)                   │
│ • TypeScript (Advanced)              │
│ • CSS/Tailwind (Intermediate)        │
│                                      │
│ Nice to Have:                        │
│ • GraphQL                            │
│ • Testing (Jest, RTL)                │
│                                      │
│ [❤️ Save]                            │
└──────────────────────────────────────┘
```

#### Profile Setup Screen
```
┌──────────────────────────────────────┐
│ Complete Your Profile                │
├──────────────────────────────────────┤
│ Name: [________________]              │
│ Experience Level:                    │
│   ○ Junior (0-2 years)              │
│   ○ Mid (2-5 years)                 │
│   ○ Senior (5+ years)               │
│                                      │
│ Technologies (select multiple):      │
│ ☑ React    ☑ Python   ☐ Go          │
│ ☑ TypeScript ☑ Node.js ☐ Rust      │
│                                      │
│ Job Type Preference:                │
│ ☑ CDI    ☑ Freelance    ☐ Stage    │
│                                      │
│ Location Preference:                │
│ ○ Remote   ○ Hybrid   ● On-site    │
│ City: [Paris________]                │
│                                      │
│ Salary Expectation:                 │
│ Min: [50k] EUR  Max: [80k] EUR     │
│                                      │
│ [Skip] [< Prev] [Next >]            │
└──────────────────────────────────────┘
```

---

## 💡 Feature Details

### 1. Unified Job Search
- **Aggregates from**: LinkedIn, Indeed, Stack Overflow, GitHub, Custom APIs
- **Normalization**: Standardized data format (title, desc, location, salary)
- **Deduplication**: Same job posted multiple places shown once
- **Filtering**: 
  - Location (city, country, remote)
  - Tech stack (React, Python, etc)
  - Experience level
  - Job type (CDI, CDD, freelance)
  - Salary range
  - Company size

### 2. AI Compatibility Score (Future)
- **Input**: User profile + job requirements
- **Model**: Skill matching + experience gap + salary alignment
- **Output**: 0-100% match score + explanation
- **Example**: 
  - User: React, 3yr exp, wants 50k
  - Job: React, TS, 5yr exp, 60k
  - Match: 75% (has React, missing TS, underexperienced)

### 3. Favorites System
- **Save jobs**: One-click save to personal collection
- **Organize**: Tags + notes per job
- **Alert**: Email when saved job status changes (deadline, filled)
- **Export**: Download saved jobs as PDF

### 4. Analytics for Job Posters (Recruiter Portal - V2)
- **Dashboard**: Views, clicks, applications per job
- **Conversion funnel**: View → Click → Application
- **Candidate insights**: Most common skills, experience levels
- **A/B testing**: Test job titles, descriptions
- **Premium feature**: $49/month for featured placement

---

## 🎨 Design System


### Typography
- **Heading 1**: 32px, Bold
- **Heading 2**: 24px, Semi-bold
- **Body**: 14px, Regular
- **Caption**: 12px, Regular
- **Font**: Inter (system font stack)

### Components
- **Buttons**: Primary (filled), Secondary (outline), Tertiary (text)
- **Cards**: Job cards, company cards, stat cards
- **Modals**: Filters, save job, share job
- **Inputs**: Text, email, select, multi-select, range slider

---

## 📊 User Personas

### Persona 1: Junior Dev (Growth User)
- **Age**: 22-26
- **Experience**: 0-2 years
- **Pain**: Overwhelmed by job choices, unsure if qualified
- **Solution**: AI match score helps confidence
- **Value**: Saved time vs 5 job boards

### Persona 2: Senior Dev (Passive User)
- **Age**: 30-40
- **Experience**: 5-15 years
- **Pain**: Tired of recruiter spam, wants quality only
- **Solution**: Tech-focused board, pre-filtered
- **Value**: Quality over quantity

### Persona 3: Recruiter/HR (Business User)
- **Age**: 28-35
- **Pain**: Hard to reach quality devs
- **Solution**: Targeted posting to dev audience
- **Value**: Lower CAC, higher conversion

---

## 🚀 Growth Strategy

### User Acquisition (Year 1 Target: 10K MAU)
1. **SEO** (30%): Job content ranks high
   - "React jobs in Paris"
   - "Remote Python developer jobs"

2. **Social** (20%): Share on Twitter, LinkedIn, HN
   - Launch on ProductHunt
   - Dev communities (Reddit, Discord)

3. **Organic** (30%): Word of mouth
   - Free job board attracts devs
   - Viral potential ("my new job portal")

4. **Paid** (20%): Google Ads, LinkedIn ads
   - "Find React jobs" campaigns
   - Budget: €2K/month

### Monetization (Year 2)
1. **Recruiter Listings**: €49/month per job (premium placement)
2. **Data**: Anonymized salary benchmarks (premium subscribers)
3. **API Access**: For other platforms (revenue share)
4. **Affiliate**: Commission on job placements

**Projected Year 1 Revenue**: €0 (MVP phase)
**Projected Year 2 Revenue**: €50K (50 paying recruiters)

---

## 👥 User Feedback Strategy

### Survey (Monthly)
- NPS survey in-app
- "What would make this better?" open text
- Track: Satisfaction, feature requests, bugs

### User Testing (Quarterly)
- 5-10 user sessions
- Screen recording + think-aloud protocol
- Focus on: Job search flow, filtering, compatibility

### Analytics (Continuous)
- Track: Search queries, filters used, click patterns
- Identify: Drop-off points, most used features
- Alert on: Unexpected behavior changes

### Community
- Discord server for users/recruiters
- Monthly community calls
- Bug reports + feature requests via GitHub issues

---

## 📋 Launch Strategy

### Pre-Launch (1 week)
- Email to 1K beta testers (sign-up form)
- HackerNews post
- Twitter thread (@ developers)

### Launch Day
- ProductHunt submission
- Tech newsletters (ThePragmatic Engineer, etc)
- Dev subreddits (r/webdev, r/learnprogramming)

### Post-Launch
- Weekly blog posts (e.g., "Top skills in 2024")
- Recruiter outreach (LinkedIn)
- Podcast appearances

---

## 🎁 Unique Value Propositions

1. **Single destination** for all tech jobs (no app switching)
2. **AI-powered matching** (know your fit before applying)
3. **Dev-first filtering** (tech stack, not generic criteria)
4. **Community-driven** (curated quality jobs, not spam)
5. **European focus** (salaries, laws, GDPR compliance)
