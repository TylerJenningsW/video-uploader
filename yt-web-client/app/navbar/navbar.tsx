'use client'
import Image from 'next/image'
import styles from './navbar.module.css'
import Link from 'next/link'
import SignIn from './sign-in'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChangedHelper } from '../firebase/firebase'
import Upload from './upload'
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
      <div className={styles.side}>
        {user && <Upload />}
        <SignIn user={user} />
      </div>
    </nav>
  )
}
