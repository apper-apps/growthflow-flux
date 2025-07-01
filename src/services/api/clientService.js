import { mockClients } from '@/services/mockData/clients'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const clientService = {
  async getAll() {
    await delay(300)
    return [...mockClients]
  },

  async getById(id) {
    await delay(200)
    const client = mockClients.find(c => c.Id === parseInt(id))
    if (!client) throw new Error('Client not found')
    return { ...client }
  },

  async create(clientData) {
    await delay(400)
    const newClient = {
      ...clientData,
      Id: Math.max(...mockClients.map(c => c.Id)) + 1,
      createdAt: new Date().toISOString()
    }
    mockClients.push(newClient)
    return { ...newClient }
  },

  async update(id, data) {
    await delay(300)
    const index = mockClients.findIndex(c => c.Id === parseInt(id))
    if (index === -1) throw new Error('Client not found')
    
    mockClients[index] = { ...mockClients[index], ...data }
    return { ...mockClients[index] }
  },

  async delete(id) {
    await delay(300)
    const index = mockClients.findIndex(c => c.Id === parseInt(id))
    if (index === -1) throw new Error('Client not found')
    
    mockClients.splice(index, 1)
    return true
  },

  async getSettings(clientId) {
    await delay(300)
    return {
      leadsharkApiKey: 'sk_test_***************',
      emailSettings: {
        fromName: 'Marketing Team',
        fromEmail: 'hello@company.com',
        replyTo: 'replies@company.com'
      },
      notifications: {
        emailReports: true,
        newProspects: true,
        sequenceComplete: false
      }
    }
  },

  async updateSettings(clientId, settings) {
    await delay(400)
    return settings
  }
}