import { spawn } from 'node:child_process'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

const sourceDir = path.resolve('public/media')
const originalVideoDir = path.resolve('original-media')
const outputDir = path.resolve('public/optimized')

const imageExtensions = new Set(['.jpg', '.jpeg', '.png'])
const videoExtensions = new Set(['.mov', '.mp4'])

const runFfmpeg = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`ffmpeg exited with code ${code}\n${stderr}`))
    })
  })

await mkdir(outputDir, { recursive: true })

const files = await readdir(sourceDir)
const videoSourceFiles = await readdir(originalVideoDir).catch(() => files)
let optimizedImages = 0
let optimizedVideos = 0

for (const file of files) {
  const extension = path.extname(file).toLowerCase()

  if (!imageExtensions.has(extension)) {
    continue
  }

  const source = path.join(sourceDir, file)
  const baseName = file.slice(0, -path.extname(file).length)

  await sharp(source)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outputDir, `${baseName}-large.webp`))

  await sharp(source)
    .rotate()
    .resize({ width: 920, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outputDir, `${baseName}-gallery.webp`))

  optimizedImages += 1
}

for (const file of videoSourceFiles) {
  const extension = path.extname(file).toLowerCase()

  if (!videoExtensions.has(extension)) {
    continue
  }

  const source = path.join(videoSourceFiles === files ? sourceDir : originalVideoDir, file)
  const baseName = file.slice(0, -path.extname(file).length)
  const videoOutput = path.join(outputDir, `${baseName}.mp4`)
  const posterOutput = path.join(outputDir, `${baseName}-poster.webp`)

  await runFfmpeg([
    '-y',
    '-i',
    source,
    '-vf',
    'scale=w=min(1280\\,iw):h=-2',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '27',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-c:a',
    'aac',
    '-b:a',
    '96k',
    videoOutput,
  ])

  await runFfmpeg([
    '-y',
    '-ss',
    '00:00:00.8',
    '-i',
    source,
    '-frames:v',
    '1',
    '-vf',
    'scale=w=min(920\\,iw):h=-2',
    posterOutput,
  ])

  optimizedVideos += 1
}

console.log(`Optimized ${optimizedImages} images and ${optimizedVideos} videos.`)
