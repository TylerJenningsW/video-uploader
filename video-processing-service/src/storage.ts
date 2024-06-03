import { Storage } from '@google-cloud/storage'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'


const storage = new Storage()
// Buckets must be named uniquely for GCS
const rawVideoBucketName = 'tj-yt-raw-videos'
const processedVideoBucketName = 'tj-yt-processed-videos'

const localRawVideoPath = './raw-videos/'
const localProcessedVideoPath = './processed-videos/'

/**
 * Creates the local directories for raw and processed videos.
 **/
export function setupDirectories() {
  ensureDirectoryExists(localRawVideoPath)
  ensureDirectoryExists(localProcessedVideoPath)
}

/**
 * @param rawVideoName: - The name of the raw video file to convert {@link localRawVideoPath},
 * @param processVideoName: - The name of the processed video file to save {@link localProcessedVideoPath},
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processVideoName: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
      .outputOptions('-vf', 'scale=-1:360') // 360p
      .on('end', () => {
        console.log('Video Processing finished.')
        resolve()
      })
      .on('error', (err) => {
        console.log(`Internal server error: ${err.message}`)
        reject(err)
      })
      .save(`${localProcessedVideoPath}/${processVideoName}`)
  })
}

/**
 * @param fileName - The name of the file to upload from the
 * {@link rawVideoBucketName} folder to the {@link localRawVideoPath} folder
 * @returns A promise that resolves when the file has been downloaded.
 * */
export async function downloadRawVideo(fileName: string) {
  await storage
    .bucket(rawVideoBucketName)
    .file(fileName)
    .download({ destination: `${localRawVideoPath}/${fileName}` })

  console.log(
    `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`
  )
}

/**
 * @param fileName - The name of the file to upload from the
 * {@link localProcessedVideoPath} folder to the {@link processedVideoBucketName}
 * @returns A promise that resolves when the file has been uploaded.
 * */

export async function uploadProcessedVideo(fileName: string) {
  const bucket = storage.bucket(processedVideoBucketName)

  bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
    destination: fileName,
  })
  console.log(
    `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
  )
  await bucket.file(fileName).makePublic()
}

/**
 * 
 * @param fileName - The name of the file to delete from the {@link localRawVideoPath} folder
 * @returns A promise that resolves when the file has been deleted.
 */
export function deleteRawVideo(fileName: string) {
  return deleteFile(`${localRawVideoPath}/${fileName}`)
}


/**
 * 
 * @param fileName - The name of the file to delete from the {@link localProcessedVideoPath} folder
 * @returns A promise that resolves when the file has been deleted.
 */
export function deleteProcessedVideo(fileName: string) {
  return deleteFile(`${localProcessedVideoPath}/${fileName}`)
}
/**
 *
 * @param filePath - The path of the file to delete
 * @returns A promise that resolves when the file has been deleted.
 */
function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`)
          reject(err)
        } else {
          console.log(`Deleted file at ${filePath}`)
          resolve()
        }
      })
    } else {
      console.log(`File not found at ${filePath}, skipping delete.`)
      resolve()
    }
  })
}

/**
 * 
 * @param directory - The directory to check
 */
function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }) // recursive: true creates parent directories if they don't exist
    console.log(`Directory created at ${directory}`)
  }
}