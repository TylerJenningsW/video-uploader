'use client'
import Image from 'next/image'
import styles from './navbar.module.css'
import Link from 'next/link'
import SignIn from './sign-in'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChangedHelper } from '../firebase/firebase'
export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChangedHelper((user) => {
      setUser(user)
    })
  })
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          width={90}
          height={20}
          src="/youtube-logo.svg"
          alt="Youtube Logo"
        />
      </Link>
      <SignIn user={user} />
    </nav>
  )
}
