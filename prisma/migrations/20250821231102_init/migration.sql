-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('manager', 'revisor');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('planificado', 'ejecucion', 'pausado', 'finalizado', 'paralizado', 'suspendido', 'liquidado', 'proceso_de_liquidacion');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'revisor',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "cui" TEXT NOT NULL,
    "functional_division" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost_liquidation" DECIMAL(65,30),
    "cost_supervision" DECIMAL(65,30),
    "start_date" DATE,
    "original_end_date" DATE,
    "current_progress" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "status" "public"."ProjectStatus" NOT NULL DEFAULT 'planificado',
    "supervisor" TEXT,
    "resident" TEXT,
    "execution_period" TEXT,
    "email_executing_company" TEXT,
    "supervision_email" TEXT,
    "cell_phone" TEXT,
    "location" TEXT,
    "contractor" TEXT,
    "suspension_start_date" DATE,
    "suspension_end_date" DATE,
    "rescheduled_end_date" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectProgress" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "progress" DECIMAL(65,30) NOT NULL,
    "progressDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_cui_key" ON "public"."Project"("cui");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectProgress" ADD CONSTRAINT "ProjectProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectProgress" ADD CONSTRAINT "ProjectProgress_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
