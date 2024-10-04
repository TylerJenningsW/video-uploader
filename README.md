# Video Uploader

This project provides a platform to upload, process, and view videos seamlessly using modern technologies such as Firebase, Google Cloud Storage, and Express.js.
Features

    Video Upload: Users can upload video files via the web interface.
    Cloud Integration: Videos are stored in Google Cloud Storage.
    Video Processing: FFmpeg is used to process videos efficiently.
    Custom Authentication: Firebase handles user authentication for secure access.

## Tech Stack

    Node.js
    Next.js
    Express.js
    Firebase
    Google Cloud Storage
    FFmpeg
    Docker

## Installation

Clone the repository:
```
git clone https://github.com/TylerJenningsW/video-uploader.git
```
Install dependencies:
```
npm install
```
Set up your environment variables:

    Configure Firebase and Google Cloud Storage credentials in a .env file.

Usage

    Navigate to the video uploader interface and follow the prompts to upload videos.
    After uploading, videos are processed in the cloud and made available for viewing.

Docker Setup

To run the app in a Docker container:

```
docker-compose up --build
```
Contributing

Feel free to submit issues or pull requests for any enhancements or bug fixes.
