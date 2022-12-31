import { useSession, signIn, signOut } from 'next-auth/react';

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color='#04d361' size={20} />
      {session.user?.name}
      <FiX size={20} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color='#eba417' size={20} />
      Sign in with GitHub
    </button>
  )
}