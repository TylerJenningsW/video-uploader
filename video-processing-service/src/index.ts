import express from 'express'
import ffmpeg from 'fluent-ffmpeg'
const app = express()
app.use(express.json())

app.post('/process-video', (req, res) => {
  // Get path to video file from request
  const inputFilePath = req.body.inputFilePath
  const outputFilePath = req.body.outputFilePath

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send('Missing input or output file path')
  }
  ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360') // 360p
    .on('end', () => {
      res.status(200).send('Video Processing finished.')
    })
    .on('error', (err) => {
      console.log('Error:', err)
      res.status(500).send(`Internal server error: ${err.message}`)
    })
    .save(outputFilePath)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
