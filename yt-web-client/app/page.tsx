import Image from 'next/image'
import styles from './page.module.css'
import { getVideos } from './firebase/functions'
import Link from 'next/link'

export default async function Home() {
  const videos = await getVideos()
  return (
    <main>
      {videos.map((video) => (
        <Link key={video.filename} href={`/watch?v=${video.filename}`}>
          <Image
            src={'/thumbnail.png'}
            alt="video"
            width={120}
            height={80}
            className={styles.thumbnail}
          />
        </Link>
      ))}
    </main>
  )
}
