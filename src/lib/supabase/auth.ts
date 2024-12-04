import { supabase } from './client';
import { toast } from 'react-hot-toast';
import { normalizeUrl } from '../utils/url';

interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  website?: string;
}

export async function signUp(data: SignUpData) {
  try {
    // Normalize website URL if provided
    const normalizedData = {
      ...data,
      website: data.website ? normalizeUrl(data.website) : undefined
    };

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: normalizedData.email,
      password: normalizedData.password,
      options: {
        data: {
          first_name: normalizedData.firstName,
          last_name: normalizedData.lastName,
          organization: normalizedData.organization,
          website: normalizedData.website
        }
      }
    });

    if (signUpError) throw signUpError;

    // Create profile in profiles table
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            first_name: normalizedData.firstName,
            last_name: normalizedData.lastName,
            organization: normalizedData.organization,
            website: normalizedData.website,
            email: normalizedData.email
          }
        ]);

      if (profileError) throw profileError;
    }

    toast.success('Account created successfully! Please check your email for verification.');
    return authData;
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Logout error:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
}