import { createTRPCRouter } from './trpc';
import { authRouter } from './routers/auth';
import { sessionRouter } from './routers/session';
import { progressRouter } from './routers/progress';
import { contentRouter } from './routers/content';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  session: sessionRouter,
  progress: progressRouter,
  content: contentRouter,
});

export type AppRouter = typeof appRouter;
