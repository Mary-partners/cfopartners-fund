-- CreateEnum
CREATE TYPE "ReviewOutcome" AS ENUM ('APPROVED', 'CHANGES_REQUESTED');

-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'TASK_REVIEWED';

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "taskId" UUID NOT NULL,
    "reviewerMembershipId" UUID NOT NULL,
    "preparerMembershipId" UUID,
    "outcome" "ReviewOutcome" NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reviews_taskId_createdAt_idx" ON "reviews"("taskId", "createdAt");

-- CreateIndex
CREATE INDEX "reviews_reviewerMembershipId_idx" ON "reviews"("reviewerMembershipId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewerMembershipId_fkey" FOREIGN KEY ("reviewerMembershipId") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_preparerMembershipId_fkey" FOREIGN KEY ("preparerMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
