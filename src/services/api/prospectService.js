import { mockProspects } from '@/services/mockData/prospects'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const prospectService = {
  async getAll() {
    await delay(300)
    return [...mockProspects]
  },

  async getByClient(clientId) {
    await delay(300)
    return mockProspects.filter(p => p.clientId === parseInt(clientId))
  },

  async getById(id) {
    await delay(200)
    const prospect = mockProspects.find(p => p.Id === parseInt(id))
    if (!prospect) throw new Error('Prospect not found')
    return { ...prospect }
  },

  async create(prospectData) {
    await delay(400)
    const newProspect = {
      ...prospectData,
      Id: Math.max(...mockProspects.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }
    mockProspects.push(newProspect)
    return { ...newProspect }
  },

  async update(id, data) {
    await delay(300)
    const index = mockProspects.findIndex(p => p.Id === parseInt(id))
    if (index === -1) throw new Error('Prospect not found')
    
    mockProspects[index] = { ...mockProspects[index], ...data }
    return { ...mockProspects[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockProspects.findIndex(p => p.Id === parseInt(id))
    if (index === -1) throw new Error('Prospect not found')
    
    mockProspects.splice(index, 1)
    return true
  },

  async importFromLeadshark(clientId, apiKey) {
    await delay(2000)
    // Mock import - would integrate with LeadShark API
    const importedProspects = [
      {
        Id: Math.max(...mockProspects.map(p => p.Id)) + 1,
        clientId: parseInt(clientId),
        email: 'imported@example.com',
        company: 'Imported Company',
        score: Math.floor(Math.random() * 100),
        segment: 'imported',
        activities: [],
        sequenceStatus: { status: 'new' },
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      }
    ]
    
    mockProspects.push(...importedProspects)
    return importedProspects
  }
}