import 'module-alias/register'

process.on('uncaughtException', async (err) => {
  console.error('Process uncaughtException:', err)
  process.exit(1)
})

process.on('SIGTERM', async () => {
  console.error('SIGTERM - Process stopped.')
})
