import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'CHILD' | 'PARENT';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'CHILD' | 'PARENT';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'CHILD' | 'PARENT';
  }
}
