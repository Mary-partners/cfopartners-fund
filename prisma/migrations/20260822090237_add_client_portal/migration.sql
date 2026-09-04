-- CreateEnum
CREATE TYPE "ClientRole" AS ENUM ('CLIENT_ADMIN', 'CLIENT_COLLABORATOR');

-- CreateEnum
CREATE TYPE "ClientApprovalOutcome" AS ENUM ('APPROVED', 'CHANGES_REQUESTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_PORTAL_INVITE_SENT';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_PORTAL_ACCESS_CLAIMED';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_APPROVAL_SUBMITTED';

-- CreateTable
CREATE TABLE "client_memberships" (
    "id" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "userId" UUID,
    "email" TEXT NOT NULL,
    "displayName" TEXT,
    "role" "ClientRole" NOT NULL DEFAULT 'CLIENT_COLLABORATOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "invitedByMembershipId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_approvals" (
    "id" UUID NOT NULL,
    "taskId" UUID NOT NULL,
    "clientMembershipId" UUID NOT NULL,
    "outcome" "ClientApprovalOutcome" NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "client_memberships_userId_idx" ON "client_memberships"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "client_memberships_clientId_email_key" ON "client_memberships"("clientId", "email");

-- CreateIndex
CREATE INDEX "client_approvals_taskId_createdAt_idx" ON "client_approvals"("taskId", "createdAt");

-- CreateIndex
CREATE INDEX "client_approvals_clientMembershipId_idx" ON "client_approvals"("clientMembershipId");

-- AddForeignKey
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_invitedByMembershipId_fkey" FOREIGN KEY ("invitedByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_approvals" ADD CONSTRAINT "client_approvals_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_approvals" ADD CONSTRAINT "client_approvals_clientMembershipId_fkey" FOREIGN KEY ("clientMembershipId") REFERENCES "client_memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
