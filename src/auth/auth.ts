import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { username, bearer } from 'better-auth/plugins';
import { createAuthMiddleware } from 'better-auth/api';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Dedicated Prisma instance for Better Auth (Prisma v7 requires driver adapter)
const pgAdapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: pgAdapter });

export const auth = betterAuth({
  appName: 'Nexandria',

  database: prismaAdapter(prisma, { provider: 'postgresql' }),

  // Sessions are stored in the database (standard persistence for the project).
  session: {
    storeSessionInDatabase: true,
  },

  // Server-managed fields. `input: false` prevents the client from setting them.
  user: {
    additionalFields: {
      // MVP: every new user is created as "verified".
      status: {
        type: 'string' as const,
        defaultValue: 'verified',
        input: false,
      },
      // Values: "USER" (default) | "ADMIN" (reserved for the future).
      role: {
        type: 'string' as const,
        defaultValue: 'USER',
        input: false,
      },
    },
  },

  // Email + password is the only authentication method in this stage.
  // Email verification is intentionally disabled: users can log in right after sign-up.
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },

  plugins: [
    // Bearer token support → mobile uses Authorization: Bearer <token>.
    // Web uses HttpOnly cookies automatically.
    bearer(),

    // Stores the `username` (and `displayUsername`) on the user record.
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
    }),
  ],

  // Auto-derives `name` from `username` when the frontend omits it on sign-up.
  // Better Auth requires `name` in the sign-up body; this hook fills it in server-side
  // so the frontend only needs to send username + email + password.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        const body = ctx.body as Record<string, unknown> | undefined;
        if (body?.username && !body?.name) {
          return {
            context: {
              body: { ...body, name: body.username },
            },
          };
        }
      }
    }),
  },

  trustedOrigins: [process.env.FRONTEND_URL ?? 'http://localhost:5173'],

  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
});

export type Session = typeof auth.$Infer.Session;
export type AuthUser = Session['user'];
