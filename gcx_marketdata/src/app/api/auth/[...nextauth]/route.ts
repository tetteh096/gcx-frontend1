import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/services/authService';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log('NextAuth: Attempting login with credentials:', { email: credentials.email });
          
          const response = await AuthService.login({
            email: credentials.email,
            password: credentials.password
          });

          console.log('NextAuth: Backend response:', response);

          // Check if we have a successful response with user data
          if (response && response.user) {
            const userObject = {
              id: response.user.id.toString(),
              email: response.user.email,
              name: response.user.name || `${response.user.first_name || ''} ${response.user.last_name || ''}`.trim(),
              role: response.user.role,
              subscription_plan: response.user.subscription_plan
            };
            
            console.log('NextAuth: Returning user object:', userObject);
            return userObject;
          }
          
          console.log('NextAuth: No valid user data in response');
          return null;
        } catch (error) {
          console.error('NextAuth: Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.subscription_plan = user.subscription_plan;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.subscription_plan = token.subscription_plan as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure dashboard redirects go to /dashboard not /app/dashboard
      if (url.includes('/app/dashboard')) {
        return `${baseUrl}/dashboard`;
      }
      // Handle specific dashboard redirects
      if (url === '/dashboard' || url === `${baseUrl}/dashboard`) {
        return `${baseUrl}/dashboard`;
      }
      // If the url is relative, prefix it with the base url
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // If the url is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Default to base url
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
