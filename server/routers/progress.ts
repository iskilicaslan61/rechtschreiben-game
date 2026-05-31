import { createTRPCRouter, protectedProcedure } from '@/server/trpc';

const createId = () => crypto.randomUUID();

export const progressRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.supabase
      .from('Progress')
      .select('*')
      .eq('userId', ctx.session.user.id)
      .maybeSingle();

    if (!data) return { totalScore: 0, stars: 0, badges: [], streak: 0, lastPlayed: null };
    return { ...data, badges: JSON.parse(data.badges) as string[] };
  }),

  leaderboard: protectedProcedure.query(async ({ ctx }) => {
    // Sadece CHILD rolündeki kullanıcıları getir
    const { data: children } = await ctx.supabase
      .from('User')
      .select('id, name, avatar')
      .eq('role', 'CHILD');

    if (!children?.length) return [];

    const childIds = children.map(c => c.id);
    const { data: progresses } = await ctx.supabase
      .from('Progress')
      .select('*')
      .in('userId', childIds)
      .gt('totalScore', 0)
      .order('totalScore', { ascending: false })
      .limit(10);

    const nameMap = Object.fromEntries(children.map(c => [c.id, { name: c.name, avatar: c.avatar }]));
    return (progresses ?? []).map(p => ({ ...p, user: nameMap[p.userId] ?? { name: 'Anonym', avatar: null } }));
  }),

  childrenProgress: protectedProcedure.query(async ({ ctx }) => {
    const { data: children } = await ctx.supabase
      .from('User')
      .select('id, name, avatar, createdAt')
      .eq('parentId', ctx.session.user.id);

    if (!children?.length) return [];

    const results = await Promise.all(
      children.map(async child => {
        const { data: progress } = await ctx.supabase
          .from('Progress')
          .select('*')
          .eq('userId', child.id)
          .maybeSingle();
        return {
          child,
          progress: progress
            ? { ...progress, badges: JSON.parse(progress.badges) as string[] }
            : { totalScore: 0, stars: 0, badges: [], streak: 0, lastPlayed: null },
        };
      })
    );

    return results;
  }),
});
