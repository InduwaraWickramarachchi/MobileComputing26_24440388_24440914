import { Redirect } from 'expo-router';
import { useAuthentication } from '../src/auth/AuthProvider';

export default function Index() {
  const { session } = useAuthentication();
  return <Redirect href={session ? '/tasks' : '/login'} />;
}
