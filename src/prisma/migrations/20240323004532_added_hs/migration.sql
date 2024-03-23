-- CreateTable
CREATE TABLE "HSUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "clerkAuthId" TEXT NOT NULL,
    "schoolId" TEXT,

    CONSTRAINT "HSUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSSchool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "HSSchool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "HSCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "HSSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSTeacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "goat" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HSTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSEnrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "HSEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HSUser_username_key" ON "HSUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "HSUser_email_key" ON "HSUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "HSUser_clerkAuthId_key" ON "HSUser"("clerkAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "HSEnrollment_userId_sectionId_key" ON "HSEnrollment"("userId", "sectionId");

-- AddForeignKey
ALTER TABLE "HSUser" ADD CONSTRAINT "HSUser_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "HSSchool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSCourse" ADD CONSTRAINT "HSCourse_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "HSSchool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSSection" ADD CONSTRAINT "HSSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "HSCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSSection" ADD CONSTRAINT "HSSection_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "HSTeacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSEnrollment" ADD CONSTRAINT "HSEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "HSUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSEnrollment" ADD CONSTRAINT "HSEnrollment_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "HSSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
