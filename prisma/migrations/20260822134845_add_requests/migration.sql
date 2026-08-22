-- CreateEnum
CREATE TYPE "RequestPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'TRIAGED', 'AWAITING_APPROVAL', 'IN_PROGRESS', 'AWAITING_CLIENT', 'COMPLETED', 'DECLINED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'REQUEST_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'REQUEST_TRIAGED';
ALTER TYPE "AuditAction" ADD VALUE 'REQUEST_STATUS_CHANGED';
ALTER TYPE "AuditAction" ADD VALUE 'REQUEST_RESOLVED';

-- CreateTable
CREATE TABLE "requests" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "RequestPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "slaDueAt" TIMESTAMP(3),
    "raisedByMembershipId" UUID,
    "raisedByClientMembershipId" UUID,
    "assigneeMembershipId" UUID,
    "resolutionNotes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "requests_organizationId_status_idx" ON "requests"("organizationId", "status");

-- CreateIndex
CREATE INDEX "requests_organizationId_slaDueAt_idx" ON "requests"("organizationId", "slaDueAt");

-- CreateIndex
CREATE INDEX "requests_clientId_idx" ON "requests"("clientId");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_raisedByMembershipId_fkey" FOREIGN KEY ("raisedByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_raisedByClientMembershipId_fkey" FOREIGN KEY ("raisedByClientMembershipId") REFERENCES "client_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_assigneeMembershipId_fkey" FOREIGN KEY ("assigneeMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
