const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardService = {
  async getMetrics(clientId) {
    await delay(400)
    
    return [
      {
        id: 1,
        title: 'Total Prospects',
        value: '1,247',
        change: '+12%',
        changeType: 'positive',
        icon: 'Users',
        gradient: 'primary',
        subtitle: '156 new this week'
      },
      {
        id: 2,
        title: 'Active Sequences',
        value: '8',
        change: '+2',
        changeType: 'positive',
        icon: 'GitBranch',
        gradient: 'secondary',
        subtitle: '3 paused'
      },
      {
        id: 3,
        title: 'Open Rate',
        value: '52.3%',
        change: '+8.2%',
        changeType: 'positive',
        icon: 'Mail',
        gradient: 'accent',
        subtitle: 'Last 30 days'
      },
      {
        id: 4,
        title: 'Conversions',
        value: '89',
        change: '+15',
        changeType: 'positive',
        icon: 'Target',
        gradient: 'success',
        subtitle: 'This month'
      }
    ]
  },

  async getRecentActivity(clientId) {
    await delay(300)
    
    return [
      {
        Id: 1,
        type: 'email_open',
        prospect: 'john@example.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        metadata: { subject: 'Welcome to our platform', score: 5 }
      },
      {
        Id: 2,
        type: 'email_click',
        prospect: 'sarah@company.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        metadata: { subject: 'Product Demo', score: 10 }
      },
      {
        Id: 3,
        type: 'sequence_complete',
        prospect: 'mike@startup.io',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        metadata: { sequence: 'Onboarding Series', score: 25 }
      }
    ]
  }
}