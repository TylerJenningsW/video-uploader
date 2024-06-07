'use client'
import styles from './sign-in.module.css'
import { signInWithGoogle, signOut } from '../firebase/firebase'
import { User } from 'firebase/auth'
export default function SignIn({ user }: { user: User | null }) {
  return (
    <>
      {user ? (
        <button className={styles.signin} onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className={styles.signin} onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </>
  )
}
 