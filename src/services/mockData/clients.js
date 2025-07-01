export const mockClients = [
  {
    Id: 1,
    name: 'TechCorp Solutions',
    logo: '/images/techcorp-logo.png',
    industry: 'Technology',
    apiKeys: {
      leadshark: 'sk_test_abc123',
      sendgrid: 'SG.xyz789'
    },
    subscription: {
      plan: 'Pro',
      status: 'active',
      expiresAt: '2024-12-31'
    },
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    Id: 2,
    name: 'Marketing Dynamics',
    logo: '/images/marketing-logo.png',
    industry: 'Marketing',
    apiKeys: {
      leadshark: 'sk_test_def456',
      sendgrid: 'SG.uvw012'
    },
    subscription: {
      plan: 'Enterprise',
      status: 'active',
      expiresAt: '2024-11-30'
    },
    createdAt: '2024-02-10T10:30:00Z'
  },
  {
    Id: 3,
    name: 'Global Ventures',
    logo: '/images/global-logo.png',
    industry: 'Finance',
    apiKeys: {
      leadshark: 'sk_test_ghi789',
      sendgrid: 'SG.rst345'
    },
    subscription: {
      plan: 'Pro',
      status: 'active',
      expiresAt: '2025-01-15'
    },
    createdAt: '2024-01-20T14:15:00Z'
  }
]