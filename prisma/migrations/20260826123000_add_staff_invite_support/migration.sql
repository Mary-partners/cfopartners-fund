-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'STAFF_INVITE_SENT';
ALTER TYPE "AuditAction" ADD VALUE 'STAFF_INVITE_CLAIMED';

-- AlterTable
-- Nullable so a staff invite (inviteStaffMemberAction) can create a
-- membership row before the invited person has ever signed in — mirrors
-- ClientMembership.userId, which has been nullable since the Client Portal
-- migration for the same "pending invite, claimed on first sign-in" reason.
ALTER TABLE "memberships" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
-- Lets an invite be looked up (and re-sent / reactivated) by email alone,
-- before a userId exists to key off of.
CREATE UNIQUE INDEX "memberships_organizationId_email_key" ON "memberships"("organizationId", "email");
