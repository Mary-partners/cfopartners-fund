-- AlterEnum
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_ACCESS_GRANTED';
ALTER TYPE "AuditAction" ADD VALUE 'CLIENT_ACCESS_REVOKED';

-- CreateTable
CREATE TABLE "client_access_grants" (
    "id" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "membershipId" UUID NOT NULL,
    "grantedByMembershipId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_access_grants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_access_grants_clientId_membershipId_key" ON "client_access_grants"("clientId", "membershipId");

-- CreateIndex
CREATE INDEX "client_access_grants_membershipId_idx" ON "client_access_grants"("membershipId");

-- AddForeignKey
ALTER TABLE "client_access_grants" ADD CONSTRAINT "client_access_grants_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_access_grants" ADD CONSTRAINT "client_access_grants_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_access_grants" ADD CONSTRAINT "client_access_grants_grantedByMembershipId_fkey" FOREIGN KEY ("grantedByMembershipId") REFERENCES "memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
