import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { clientService } from '@/services/api/clientService'

const Settings = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [settings, setSettings] = useState({
    leadsharkApiKey: '',
    emailSettings: {
      fromName: '',
      fromEmail: '',
      replyTo: ''
    },
    notifications: {
      emailReports: true,
      newProspects: true,
      sequenceComplete: true
    }
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadSettings()
    }
  }, [currentClient, clientLoading])
  
  const loadSettings = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await clientService.getSettings(currentClient.Id)
      setSettings(data)
    } catch (err) {
      setError('Failed to load settings')
      console.error('Settings error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      await clientService.updateSettings(currentClient.Id, settings)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }
  
  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }
  
  const handleToggleNotification = (field) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }))
  }
  
  const testLeadsharkConnection = async () => {
    if (!settings.leadsharkApiKey) {
      toast.error('Please enter your LeadShark API key first')
      return
    }
    
    try {
      toast.info('Testing LeadShark connection...')
      // Mock API test
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('LeadShark connection successful!')
    } catch (error) {
      toast.error('Failed to connect to LeadShark. Please check your API key.')
    }
  }
  
  if (clientLoading || loading) {
    return <Loading type="dashboard" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadSettings} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client to configure their settings"
        icon="Building"
      />
    )
  }
  
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure settings for {currentClient.name}
          </p>
        </div>
        <Button
          variant="primary"
          loading={saving}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LeadShark Integration */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <ApperIcon name="Zap" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                LeadShark Integration
              </h3>
              <p className="text-sm text-gray-500">
                Connect to import prospects
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Input
              label="API Key"
              type="password"
              placeholder="Enter your LeadShark API key"
              value={settings.leadsharkApiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, leadsharkApiKey: e.target.value }))}
            />
            
            <Button
              variant="outline"
              icon="TestTube"
              onClick={testLeadsharkConnection}
              className="w-full"
            >
              Test Connection
            </Button>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <ApperIcon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    How to find your API key
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Log into LeadShark → Settings → API Keys → Generate New Key
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Email Settings */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <ApperIcon name="Mail" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Email Settings
              </h3>
              <p className="text-sm text-gray-500">
                Configure sender details
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Input
              label="From Name"
              placeholder="Your Name"
              value={settings.emailSettings.fromName}
              onChange={(e) => handleInputChange('emailSettings', 'fromName', e.target.value)}
            />
            
            <Input
              label="From Email"
              placeholder="you@company.com"
              value={settings.emailSettings.fromEmail}
              onChange={(e) => handleInputChange('emailSettings', 'fromEmail', e.target.value)}
            />
            
            <Input
              label="Reply-To Email"
              placeholder="replies@company.com"
              value={settings.emailSettings.replyTo}
              onChange={(e) => handleInputChange('emailSettings', 'replyTo', e.target.value)}
            />
          </div>
        </motion.div>
        
        {/* Notifications */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <ApperIcon name="Bell" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Notifications
              </h3>
              <p className="text-sm text-gray-500">
                Choose what to be notified about
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { key: 'emailReports', label: 'Weekly Email Reports', description: 'Get weekly performance summaries' },
              { key: 'newProspects', label: 'New Prospects', description: 'When new prospects are imported' },
              { key: 'sequenceComplete', label: 'Sequence Completed', description: 'When prospects complete sequences' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-start space-x-3">
                <button
                  onClick={() => handleToggleNotification(notification.key)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                    settings.notifications[notification.key]
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  {settings.notifications[notification.key] && (
                    <ApperIcon name="Check" size={12} className="text-white" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-6">
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Client Name</p>
                <p className="text-sm text-gray-500">{currentClient.name}</p>
              </div>
              <Button size="sm" variant="outline" icon="Edit">
                Edit
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Subscription</p>
                <p className="text-sm text-gray-500">Pro Plan</p>
              </div>
              <Button size="sm" variant="outline" icon="CreditCard">
                Manage
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Storage Used</p>
                <p className="text-sm text-gray-500">2.4 GB of 10 GB</p>
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div className="w-6 h-2 bg-primary-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Danger Zone */}
        <motion.div
          className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-lg font-display font-semibold text-red-900 mb-6">
            Danger Zone
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900">Reset All Data</p>
                <p className="text-sm text-red-600">
                  Remove all prospects, sequences, and analytics
                </p>
              </div>
              <Button size="sm" variant="danger" icon="RotateCcw">
                Reset
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900">Delete Client</p>
                <p className="text-sm text-red-600">
                  Permanently delete this client and all data
                </p>
              </div>
              <Button size="sm" variant="danger" icon="Trash2">
                Delete
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Settings