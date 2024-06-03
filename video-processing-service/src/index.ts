import express from 'express'
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from './storage'

setupDirectories()

const app = express()
app.use(express.json())

// Invoked by the Cloud Function to process the video.
app.post('/process-video', async (req, res) => {
  // Get the bucket and file name from the Cloud Pub/Sub message.
  let data

  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString(
      'utf8'
    )
    data = JSON.parse(message)
    if (!data.name) {
      throw new Error('Invalid message payload received.')
    }
  } catch (err) {
    console.error(err)
    return res.status(400).send(`Bad Request: Missing filename.`)
  }

  const inputFileName = data.name
  const outputFileName = `proccessed_${inputFileName}`

  // Download the raw video from Cloud Storage.
  await downloadRawVideo(inputFileName)

  // Process the video.
  try {
    await convertVideo(inputFileName, outputFileName)
  } catch (err) {
    await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)])
    console.error(err)
    return res.status(500).send(`Internal Server Error: video processing failed.`)
  }

  // Upload the processed video to Cloud Storage.
  await uploadProcessedVideo(outputFileName)

  // Clean up the local file system.
  await Promise.all([deleteRawVideo(inputFileName), deleteProcessedVideo(outputFileName)])

  return res.status(200).send(`Video processed successfully.`)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
