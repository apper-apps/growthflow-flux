export const mockSegments = [
  {
    Id: 1,
    clientId: 1,
    name: 'Hot Leads',
    rules: [
      { field: 'score', operator: 'greater_than', value: '80' },
      { field: 'lastActivity', operator: 'less_than', value: '7' }
    ],
    prospects: 156,
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    Id: 2,
    clientId: 1,
    name: 'Warm Prospects',
    rules: [
      { field: 'score', operator: 'greater_than', value: '50' },
      { field: 'score', operator: 'less_than', value: '80' }
    ],
    prospects: 234,
    createdAt: '2024-01-16T10:30:00Z'
  },
  {
    Id: 3,
    clientId: 1,
    name: 'Tech Companies',
    rules: [
      { field: 'company', operator: 'contains', value: 'tech' },
      { field: 'score', operator: 'greater_than', value: '40' }
    ],
    prospects: 89,
    createdAt: '2024-01-18T14:15:00Z'
  },
  {
    Id: 4,
    clientId: 2,
    name: 'High Value Prospects',
    rules: [
      { field: 'score', operator: 'greater_than', value: '75' },
      { field: 'segment', operator: 'not_equals', value: 'cold' }
    ],
    prospects: 67,
    createdAt: '2024-02-10T11:00:00Z'
  },
  {
    Id: 5,
    clientId: 2,
    name: 'Marketing Agencies',
    rules: [
      { field: 'company', operator: 'contains', value: 'marketing' },
      { field: 'company', operator: 'contains', value: 'agency' }
    ],
    prospects: 43,
    createdAt: '2024-02-12T15:45:00Z'
  },
  {
    Id: 6,
    clientId: 3,
    name: 'Financial Services',
    rules: [
      { field: 'company', operator: 'contains', value: 'finance' },
      { field: 'score', operator: 'greater_than', value: '60' }
    ],
    prospects: 78,
    createdAt: '2024-01-22T09:30:00Z'
  },
  {
    Id: 7,
    clientId: 3,
    name: 'Recent Signups',
    rules: [
      { field: 'lastActivity', operator: 'less_than', value: '14' },
      { field: 'score', operator: 'greater_than', value: '30' }
    ],
    prospects: 124,
    createdAt: '2024-01-25T13:20:00Z'
  }
]