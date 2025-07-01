import { mockSequences } from '@/services/mockData/sequences'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const sequenceService = {
  async getAll() {
    await delay(300)
    return [...mockSequences]
  },

  async getByClient(clientId) {
    await delay(300)
    return mockSequences.filter(s => s.clientId === parseInt(clientId))
  },

  async getById(id) {
    await delay(200)
    const sequence = mockSequences.find(s => s.Id === parseInt(id))
    if (!sequence) throw new Error('Sequence not found')
    return { ...sequence }
  },

  async create(sequenceData) {
    await delay(400)
    const newSequence = {
      ...sequenceData,
      Id: Math.max(...mockSequences.map(s => s.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    mockSequences.push(newSequence)
    return { ...newSequence }
  },

  async update(id, data) {
    await delay(300)
    const index = mockSequences.findIndex(s => s.Id === parseInt(id))
    if (index === -1) throw new Error('Sequence not found')
    
    mockSequences[index] = { ...mockSequences[index], ...data }
    return { ...mockSequences[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockSequences.findIndex(s => s.Id === parseInt(id))
    if (index === -1) throw new Error('Sequence not found')
    
    mockSequences.splice(index, 1)
    return true
  }
}