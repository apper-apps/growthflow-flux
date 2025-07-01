import { mockSegments } from '@/services/mockData/segments'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const segmentService = {
  async getAll() {
    await delay(300)
    return [...mockSegments]
  },

  async getByClient(clientId) {
    await delay(300)
    return mockSegments.filter(s => s.clientId === parseInt(clientId))
  },

  async getById(id) {
    await delay(200)
    const segment = mockSegments.find(s => s.Id === parseInt(id))
    if (!segment) throw new Error('Segment not found')
    return { ...segment }
  },

  async create(segmentData) {
    await delay(400)
    const newSegment = {
      ...segmentData,
      Id: Math.max(...mockSegments.map(s => s.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    mockSegments.push(newSegment)
    return { ...newSegment }
  },

  async update(id, data) {
    await delay(300)
    const index = mockSegments.findIndex(s => s.Id === parseInt(id))
    if (index === -1) throw new Error('Segment not found')
    
    mockSegments[index] = { ...mockSegments[index], ...data }
    return { ...mockSegments[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockSegments.findIndex(s => s.Id === parseInt(id))
    if (index === -1) throw new Error('Segment not found')
    
    mockSegments.splice(index, 1)
    return true
  }
}