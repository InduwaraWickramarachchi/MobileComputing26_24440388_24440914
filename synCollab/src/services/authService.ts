import { supabase } from '../lib/supabase';

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const user = data?.user;
    return { user, session: data?.session, error };
  } catch (error) {
    return { user: null, session: null, error };
  }
};

export const signUp = async (userName: string, email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          userName: userName,
        },
      },
    });
    const user = data?.user;
    return { user, session: data?.session, error };
  } catch (error) {
    return { user: null, session: null, error };
  }
};
