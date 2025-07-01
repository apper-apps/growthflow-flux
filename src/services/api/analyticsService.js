const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const analyticsService = {
  async getAnalytics(clientId, timeRange = '30d') {
    await delay(500)
    
    return {
      overview: {
        totalProspects: 1247,
        emailsSent: 4583,
        openRate: 52.3,
        clickRate: 18.7,
        replyRate: 8.4,
        conversionRate: 4.2
      },
      engagement: {
        chartData: [
          { date: '2024-01-01', opens: 45, clicks: 12, replies: 8 },
          { date: '2024-01-02', opens: 52, clicks: 18, replies: 12 },
          { date: '2024-01-03', opens: 48, clicks: 15, replies: 9 },
          { date: '2024-01-04', opens: 61, clicks: 24, replies: 16 }
        ]
      },
      sequences: [
        { name: 'Welcome Series', prospects: 245, openRate: 68, clickRate: 24 },
        { name: 'Product Demo', prospects: 189, openRate: 52, clickRate: 18 },
        { name: 'Follow-up', prospects: 156, openRate: 41, clickRate: 15 }
      ],
      segments: [
        { name: 'Hot Leads', prospects: 156, avgScore: 85 },
        { name: 'Warm Leads', prospects: 234, avgScore: 65 },
        { name: 'Cold Leads', prospects: 189, avgScore: 35 }
      ]
    }
  },

  async getSequencePerformance(sequenceId) {
    await delay(300)
    
    return {
      totalProspects: 245,
      activeProspects: 89,
      completedProspects: 156,
      metrics: {
        openRate: 68,
        clickRate: 24,
        replyRate: 12,
        conversionRate: 6
      },
      stepPerformance: [
        { step: 1, sent: 245, opened: 166, clicked: 59 },
        { step: 2, sent: 180, opened: 94, clicked: 28 },
        { step: 3, sent: 120, opened: 48, clicked: 14 }
      ]
    }
  }
}