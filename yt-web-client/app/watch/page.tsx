'use client'

import VideoPlayer from './VideoPlayer'
import { Suspense } from 'react'

export default function Watch() {
  return (
    <div>
      <h1>Watch Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoPlayer />
      </Suspense>
    </div>
  )
}
