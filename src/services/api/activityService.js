import { mockActivities } from '@/services/mockData/activities'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const activityService = {
  async getAll() {
    await delay(300)
    return [...mockActivities]
  },

  async getByProspect(prospectId) {
    await delay(300)
    return mockActivities.filter(a => a.prospectId === parseInt(prospectId))
  },

  async getRecent(clientId, limit = 10) {
    await delay(300)
    // Filter activities for prospects belonging to the client
    const clientActivities = mockActivities.filter(a => a.clientId === parseInt(clientId))
    return clientActivities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit)
  },

  async create(activityData) {
    await delay(200)
    const newActivity = {
      ...activityData,
      Id: Math.max(...mockActivities.map(a => a.Id)) + 1,
      timestamp: new Date().toISOString()
    }
    mockActivities.push(newActivity)
    return { ...newActivity }
  }
}