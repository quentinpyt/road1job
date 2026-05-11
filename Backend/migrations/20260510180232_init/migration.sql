-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordhash" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "age" INTEGER,
    "address" TEXT,
    "Schools" TEXT,
    "Projects" TEXT,
    "Technologies" TEXT,
    "Skills" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "experience" INTEGER,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "applications" INTEGER NOT NULL DEFAULT 0,
    "applyBtnClicks" INTEGER NOT NULL DEFAULT 0,
    "atsApplications" INTEGER NOT NULL DEFAULT 0,
    "cta" INTEGER NOT NULL DEFAULT 0,
    "ctr" INTEGER NOT NULL DEFAULT 0,
    "remoteApplications" INTEGER NOT NULL DEFAULT 0,
    "totalApplications" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitsCount" INTEGER NOT NULL DEFAULT 0,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoLocation" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "city" TEXT,
    "country" TEXT,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "GeoLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "max" INTEGER NOT NULL,
    "min" INTEGER NOT NULL,
    "currency" TEXT,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_jobId_key" ON "Analytics"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "GeoLocation_jobId_key" ON "GeoLocation"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Salary_jobId_key" ON "Salary"("jobId");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoLocation" ADD CONSTRAINT "GeoLocation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
