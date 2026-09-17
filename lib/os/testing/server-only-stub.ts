// Vitest runs plain Node, not Next.js's webpack build — which is the only
// place "server-only" (imported at the top of every server-side query/
// action module) knows how to become a no-op. Outside that build it always
// throws (see node_modules/server-only/index.js), so vitest.config.ts
// aliases the real package to this empty stub for tests only. The
// production build is untouched — Next.js still resolves the real package
// there, and would still fail loudly if a server-only module were ever
// imported from client code.
export {};
