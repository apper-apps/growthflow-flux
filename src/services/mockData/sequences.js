export const mockSequences = [
  {
    Id: 1,
    clientId: 1,
    name: 'Welcome Series',
    steps: [
      {
        id: 1,
        type: 'email',
        order: 0,
        config: {
          subject: 'Welcome to TechCorp Solutions!',
          template: 'welcome-email-template',
          delay: { value: 0, unit: 'hours' }
        }
      },
      {
        id: 2,
        type: 'wait',
        order: 1,
        config: {
          delay: { value: 2, unit: 'days' }
        }
      },
      {
        id: 3,
        type: 'email',
        order: 2,
        config: {
          subject: 'How can we help you succeed?',
          template: 'follow-up-template',
          delay: { value: 0, unit: 'hours' }
        }
      }
    ],
    triggers: {
      entry: 'segment_hot',
      exit: 'replied'
    },
    status: 'active',
    metrics: {
      totalProspects: 245,
      activeProspects: 89,
      completedProspects: 156,
      openRate: 68,
      clickRate: 24
    },
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    Id: 2,
    clientId: 1,
    name: 'Product Demo Sequence',
    steps: [
      {
        id: 4,
        type: 'email',
        order: 0,
        config: {
          subject: 'See our platform in action',
          template: 'demo-invitation',
          delay: { value: 0, unit: 'hours' }
        }
      },
      {
        id: 5,
        type: 'condition',
        order: 1,
        config: {
          condition: 'email_opened',
          trueAction: 'continue',
          falseAction: 'wait'
        }
      },
      {
        id: 6,
        type: 'email',
        order: 2,
        config: {
          subject: 'Quick follow-up on the demo',
          template: 'demo-follow-up',
          delay: { value: 3, unit: 'days' }
        }
      }
    ],
    triggers: {
      entry: 'segment_warm',
      exit: 'demo_booked'
    },
    status: 'active',
    metrics: {
      totalProspects: 189,
      activeProspects: 67,
      completedProspects: 122,
      openRate: 52,
      clickRate: 18
    },
    createdAt: '2024-01-18T12:00:00Z'
  },
  {
    Id: 3,
    clientId: 2,
    name: 'Marketing Agency Outreach',
    steps: [
      {
        id: 7,
        type: 'email',
        order: 0,
        config: {
          subject: 'Boost your marketing ROI by 300%',
          template: 'agency-intro',
          delay: { value: 0, unit: 'hours' }
        }
      },
      {
        id: 8,
        type: 'wait',
        order: 1,
        config: {
          delay: { value: 5, unit: 'days' }
        }
      },
      {
        id: 9,
        type: 'email',
        order: 2,
        config: {
          subject: 'Case study: How we helped [Company] grow',
          template: 'case-study-template',
          delay: { value: 0, unit: 'hours' }
        }
      }
    ],
    triggers: {
      entry: 'imported_leadshark',
      exit: 'meeting_scheduled'
    },
    status: 'active',
    metrics: {
      totalProspects: 156,
      activeProspects: 45,
      completedProspects: 111,
      openRate: 41,
      clickRate: 15
    },
    createdAt: '2024-02-10T14:30:00Z'
  },
  {
    Id: 4,
    clientId: 2,
    name: 'Re-engagement Campaign',
    steps: [
      {
        id: 10,
        type: 'email',
        order: 0,
        config: {
          subject: 'We miss you!',
          template: 're-engagement',
          delay: { value: 0, unit: 'hours' }
        }
      }
    ],
    triggers: {
      entry: 'no_activity_30_days',
      exit: 'any_engagement'
    },
    status: 'paused',
    metrics: {
      totalProspects: 78,
      activeProspects: 0,
      completedProspects: 12,
      openRate: 28,
      clickRate: 8
    },
    createdAt: '2024-02-15T09:45:00Z'
  },
  {
    Id: 5,
    clientId: 3,
    name: 'Financial Services Nurture',
    steps: [
      {
        id: 11,
        type: 'email',
        order: 0,
        config: {
          subject: 'Your financial growth starts here',
          template: 'finance-intro',
          delay: { value: 0, unit: 'hours' }
        }
      },
      {
        id: 12,
        type: 'wait',
        order: 1,
        config: {
          delay: { value: 7, unit: 'days' }
        }
      },
      {
        id: 13,
        type: 'email',
        order: 2,
        config: {
          subject: 'Investment strategies for 2024',
          template: 'investment-guide',
          delay: { value: 0, unit: 'hours' }
        }
      }
    ],
    triggers: {
      entry: 'segment_finance',
      exit: 'consultation_booked'
    },
    status: 'draft',
    metrics: {
      totalProspects: 0,
      activeProspects: 0,
      completedProspects: 0,
      openRate: 0,
      clickRate: 0
    },
    createdAt: '2024-01-25T16:15:00Z'
  }
]