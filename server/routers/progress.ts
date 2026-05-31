import { createTRPCRouter, protectedProcedure } from '@/server/trpc';

const createId = () => crypto.randomUUID();

type ChildProgressItem = {
  child: { id: string; name: string; avatar: string | null; createdAt: string };
  progress: { totalScore: number; stars: number; badges: string[]; streak: number; lastPlayed: string | null };
};

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

    const childIds = (children ?? []).map(c => c.id);
    if (!childIds.length) return [] as { id: string; userId: string; totalScore: number; user: { name: string; avatar: string | null } }[];
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

  childrenProgress: protectedProcedure.query(async ({ ctx }): Promise<ChildProgressItem[]> => {
    const { data: children } = await ctx.supabase
      .from('User')
      .select('id, name, avatar, createdAt')
      .eq('parentId', ctx.session.user.id);

    const rows = await Promise.all(
      (children as { id: string; name: string; avatar: string | null; createdAt: string }[] ?? []).map(async child => {
        const { data: progress } = await ctx.supabase
          .from('Progress')
          .select('*')
          .eq('userId', child.id)
          .maybeSingle();
        return {
          child,
          progress: progress
            ? { totalScore: (progress as any).totalScore as number, stars: (progress as any).stars as number, badges: JSON.parse((progress as any).badges) as string[], streak: (progress as any).streak as number, lastPlayed: (progress as any).lastPlayed as string | null }
            : { totalScore: 0, stars: 0, badges: [] as string[], streak: 0, lastPlayed: null as string | null },
        };
      })
    );
    return rows;
  }),
});
