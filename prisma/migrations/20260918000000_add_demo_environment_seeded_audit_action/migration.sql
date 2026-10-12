-- Adds one AuditAction value so seedDemoEnvironmentAction (lib/os/demo/seed.ts)
-- has something specific to log, matching the pattern of every other action
-- in this enum rather than reusing an unrelated one.
ALTER TYPE "AuditAction" ADD VALUE 'DEMO_ENVIRONMENT_SEEDED';
