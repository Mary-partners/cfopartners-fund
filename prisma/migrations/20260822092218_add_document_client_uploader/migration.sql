-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "uploadedByClientMembershipId" UUID;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedByClientMembershipId_fkey" FOREIGN KEY ("uploadedByClientMembershipId") REFERENCES "client_memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
