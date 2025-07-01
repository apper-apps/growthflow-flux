export const mockProspects = [
  {
    Id: 1,
    clientId: 1,
    email: 'john.smith@techstartup.com',
    company: 'Tech Startup Inc',
    score: 85,
    segment: 'hot',
    activities: [1, 2, 3],
    sequenceStatus: {
      status: 'active',
      currentStep: 2,
      sequenceId: 1
    },
    createdAt: '2024-01-15T08:00:00Z',
    lastActivity: '2024-01-20T15:30:00Z'
  },
  {
    Id: 2,
    clientId: 1,
    email: 'sarah.johnson@digitalagency.com',
    company: 'Digital Agency Pro',
    score: 72,
    segment: 'warm',
    activities: [4, 5],
    sequenceStatus: {
      status: 'nurturing',
      currentStep: 1,
      sequenceId: 2
    },
    createdAt: '2024-01-16T09:15:00Z',
    lastActivity: '2024-01-19T11:45:00Z'
  },
  {
    Id: 3,
    clientId: 1,
    email: 'mike.chen@innovateplus.com',
    company: 'Innovate Plus',
    score: 91,
    segment: 'hot',
    activities: [6, 7, 8, 9],
    sequenceStatus: {
      status: 'converted',
      currentStep: 5,
      sequenceId: 1
    },
    createdAt: '2024-01-14T16:20:00Z',
    lastActivity: '2024-01-21T09:10:00Z'
  },
  {
    Id: 4,
    clientId: 2,
    email: 'lisa.wang@marketingpro.com',
    company: 'Marketing Pro Solutions',
    score: 58,
    segment: 'warm',
    activities: [10, 11],
    sequenceStatus: {
      status: 'active',
      currentStep: 3,
      sequenceId: 3
    },
    createdAt: '2024-02-10T11:00:00Z',
    lastActivity: '2024-02-15T14:20:00Z'
  },
  {
    Id: 5,
    clientId: 2,
    email: 'david.brown@brandbuilders.com',
    company: 'Brand Builders Co',
    score: 43,
    segment: 'cold',
    activities: [12],
    sequenceStatus: {
      status: 'paused',
      currentStep: 1,
      sequenceId: 4
    },
    createdAt: '2024-02-12T13:30:00Z',
    lastActivity: '2024-02-14T16:05:00Z'
  },
  {
    Id: 6,
    clientId: 3,
    email: 'emma.davis@financecore.com',
    company: 'Finance Core Ltd',
    score: 79,
    segment: 'warm',
    activities: [13, 14, 15],
    sequenceStatus: {
      status: 'active',
      currentStep: 2,
      sequenceId: 5
    },
    createdAt: '2024-01-22T10:45:00Z',
    lastActivity: '2024-01-25T12:30:00Z'
  }
]