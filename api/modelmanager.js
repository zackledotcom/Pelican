const { Ollama } = require('ollama')

class ModelManager {
  constructor() {
    this.ollama = new Ollama({ host: 'http://localhost:11434' })
    this.availableModels = []
  }

  async listModels() {
    try {
      const response = await this.ollama.list()
      this.availableModels = response.models.map(model => model.name)
      return this.availableModels
    } catch (error) {
      console.error('Error listing models:', error)
      return []
    }
  }

  async pullModel(modelName) {
    try {
      const response = await this.ollama.pull({ model: modelName })
      return response
    } catch (error) {
      console.error(`Error pulling model ${modelName}:`, error)
      throw error
    }
  }
}

module.exports = ModelManager