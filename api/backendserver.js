const express = require('express')
const { Ollama } = require('ollama')
const cors = require('cors')
const path = require('path')

const app = express()
const ollama = new Ollama({ host: 'http://localhost:11434' })

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model, options } = req.body
    const response = await ollama.chat({
      model: model || 'llama3',
      messages,
      options: options || { temperature: 0.7 }
    })
    res.json(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  if (process.send) {
    process.send('backend-ready')
  }
})