export const mockActivities = [
  {
    Id: 1,
    prospectId: 1,
    clientId: 1,
    type: 'email_open',
    timestamp: '2024-01-20T15:30:00Z',
    metadata: {
      subject: 'Welcome to TechCorp Solutions!',
      sequenceId: 1,
      stepId: 1,
      score: 5
    }
  },
  {
    Id: 2,
    prospectId: 1,
    clientId: 1,
    type: 'email_click',
    timestamp: '2024-01-20T15:35:00Z',
    metadata: {
      subject: 'Welcome to TechCorp Solutions!',
      url: 'https://techcorp.com/onboarding',
      sequenceId: 1,
      stepId: 1,
      score: 10
    }
  },
  {
    Id: 3,
    prospectId: 1,
    clientId: 1,
    type: 'website_visit',
    timestamp: '2024-01-20T15:40:00Z',
    metadata: {
      page: '/pricing',
      duration: 180,
      score: 8
    }
  },
  {
    Id: 4,
    prospectId: 2,
    clientId: 1,
    type: 'email_open',
    timestamp: '2024-01-19T11:45:00Z',
    metadata: {
      subject: 'See our platform in action',
      sequenceId: 2,
      stepId: 4,
      score: 5
    }
  },
  {
    Id: 5,
    prospectId: 2,
    clientId: 1,
    type: 'form_submit',
    timestamp: '2024-01-19T12:00:00Z',
    metadata: {
      form: 'Demo Request',
      score: 25
    }
  },
  {
    Id: 6,
    prospectId: 3,
    clientId: 1,
    type: 'email_open',
    timestamp: '2024-01-21T09:10:00Z',
    metadata: {
      subject: 'How can we help you succeed?',
      sequenceId: 1,
      stepId: 3,
      score: 5
    }
  },
  {
    Id: 7,
    prospectId: 3,
    clientId: 1,
    type: 'email_click',
    timestamp: '2024-01-21T09:15:00Z',
    metadata: {
      subject: 'How can we help you succeed?',
      url: 'https://techcorp.com/case-studies',
      sequenceId: 1,
      stepId: 3,
      score: 10
    }
  },
  {
    Id: 8,
    prospectId: 3,
    clientId: 1,
    type: 'website_visit',
    timestamp: '2024-01-21T09:20:00Z',
    metadata: {
      page: '/case-studies',
      duration: 420,
      score: 12
    }
  },
  {
    Id: 9,
    prospectId: 3,
    clientId: 1,
    type: 'sequence_complete',
    timestamp: '2024-01-21T09:25:00Z',
    metadata: {
      sequence: 'Welcome Series',
      sequenceId: 1,
      score: 30
    }
  },
  {
    Id: 10,
    prospectId: 4,
    clientId: 2,
    type: 'email_open',
    timestamp: '2024-02-15T14:20:00Z',
    metadata: {
      subject: 'Boost your marketing ROI by 300%',
      sequenceId: 3,
      stepId: 7,
      score: 5
    }
  },
  {
    Id: 11,
    prospectId: 4,
    clientId: 2,
    type: 'website_visit',
    timestamp: '2024-02-15T14:25:00Z',
    metadata: {
      page: '/services',
      duration: 240,
      score: 8
    }
  },
  {
    Id: 12,
    prospectId: 5,
    clientId: 2,
    type: 'email_open',
    timestamp: '2024-02-14T16:05:00Z',
    metadata: {
      subject: 'We miss you!',
      sequenceId: 4,
      stepId: 10,
      score: 3
    }
  },
  {
    Id: 13,
    prospectId: 6,
    clientId: 3,
    type: 'email_open',
    timestamp: '2024-01-25T12:30:00Z',
    metadata: {
      subject: 'Your financial growth starts here',
      sequenceId: 5,
      stepId: 11,
      score: 5
    }
  },
  {
    Id: 14,
    prospectId: 6,
    clientId: 3,
    type: 'email_click',
    timestamp: '2024-01-25T12:35:00Z',
    metadata: {
      subject: 'Your financial growth starts here',
      url: 'https://globalventures.com/calculator',
      sequenceId: 5,
      stepId: 11,
      score: 10
    }
  },
  {
    Id: 15,
    prospectId: 6,
    clientId: 3,
    type: 'form_submit',
    timestamp: '2024-01-25T12:45:00Z',
    metadata: {
      form: 'Investment Calculator',
      score: 20
    }
  }
]