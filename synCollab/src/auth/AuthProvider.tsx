import { Session, User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext<{ session: Session | null; loading: boolean }>({
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
}

export const useAuthentication = () => useContext(AuthContext);

export type AuthResult = {
  user: User | null;
  session: Session | null;
  error: string | null;
};

const toMessage = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong');

export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return { user: data.user, session: data.session, error: error?.message ?? null };
  } catch (e) {
    return { user: null, session: null, error: toMessage(e) };
  }
};

export const signUp = async (
  userName: string,
  email: string,
  password: string,
): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { name: userName.trim() },
      },
    });
    return { user: data.user, session: data.session, error: error?.message ?? null };
  } catch (e) {
    return { user: null, session: null, error: toMessage(e) };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message ?? null };
  } catch (e) {
    return { error: toMessage(e) };
  }
};
