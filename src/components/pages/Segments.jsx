import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { segmentService } from '@/services/api/segmentService'

const Segments = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [segments, setSegments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingSegment, setEditingSegment] = useState(null)
  const [segmentName, setSegmentName] = useState('')
  const [rules, setRules] = useState([])
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadSegments()
    }
  }, [currentClient, clientLoading])
  
  const loadSegments = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await segmentService.getByClient(currentClient.Id)
      setSegments(data)
    } catch (err) {
      setError('Failed to load segments')
      console.error('Segments error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCreateSegment = () => {
    setEditingSegment(null)
    setSegmentName('')
    setRules([{ field: 'score', operator: 'greater_than', value: '50' }])
    setShowBuilder(true)
  }
  
  const handleEditSegment = (segment) => {
    setEditingSegment(segment)
    setSegmentName(segment.name)
    setRules(segment.rules || [])
    setShowBuilder(true)
  }
  
  const handleSaveSegment = async () => {
    if (!segmentName.trim()) {
      toast.error('Please enter a segment name')
      return
    }
    
    if (rules.length === 0) {
      toast.error('Please add at least one rule')
      return
    }
    
    try {
      const segmentData = {
        name: segmentName,
        rules,
        clientId: currentClient.Id,
        prospects: calculateMatchingProspects(rules)
      }
      
      if (editingSegment) {
        await segmentService.update(editingSegment.Id, segmentData)
        toast.success('Segment updated successfully')
      } else {
        await segmentService.create(segmentData)
        toast.success('Segment created successfully')
      }
      
      setShowBuilder(false)
      loadSegments()
    } catch (error) {
      toast.error('Failed to save segment')
    }
  }
  
  const handleDeleteSegment = async (segment) => {
    if (window.confirm(`Are you sure you want to delete "${segment.name}"?`)) {
      try {
        await segmentService.delete(segment.Id)
        toast.success('Segment deleted successfully')
        loadSegments()
      } catch (error) {
        toast.error('Failed to delete segment')
      }
    }
  }
  
  const addRule = () => {
    setRules([...rules, { field: 'score', operator: 'greater_than', value: '' }])
  }
  
  const updateRule = (index, field, value) => {
    const updatedRules = [...rules]
    updatedRules[index] = { ...updatedRules[index], [field]: value }
    setRules(updatedRules)
  }
  
  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index))
  }
  
  const calculateMatchingProspects = (rules) => {
    // Mock calculation - in real app would query prospects
    return Math.floor(Math.random() * 100) + 10
  }
  
  const fieldOptions = [
    { value: 'score', label: 'Engagement Score' },
    { value: 'segment', label: 'Current Segment' },
    { value: 'company', label: 'Company' },
    { value: 'lastActivity', label: 'Last Activity' }
  ]
  
  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'contains', label: 'Contains' }
  ]
  
  if (clientLoading || loading) {
    return <Loading type="cards" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadSegments} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client to view their segments"
        icon="Building"
      />
    )
  }
  
  if (showBuilder) {
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
              {editingSegment ? 'Edit Segment' : 'Create Segment'}
            </h1>
            <p className="text-gray-600 mt-1">
              Define rules to automatically categorize prospects
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="secondary" onClick={() => setShowBuilder(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSegment}>
              Save Segment
            </Button>
          </div>
        </div>
        
        {/* Segment Builder */}
        <div className="gradient-card rounded-xl p-6">
          <div className="space-y-6">
            {/* Segment Name */}
            <Input
              label="Segment Name"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            
            {/* Rules */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Segmentation Rules
                </label>
                <Button size="sm" variant="outline" icon="Plus" onClick={addRule}>
                  Add Rule
                </Button>
              </div>
              
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <select
                      value={rule.field}
                      onChange={(e) => updateRule(index, 'field', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={rule.operator}
                      onChange={(e) => updateRule(index, 'operator', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {operatorOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <input
                      type="text"
                      placeholder="Value"
                      value={rule.value}
                      onChange={(e) => updateRule(index, 'value', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Trash2"
                      onClick={() => removeRule(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Preview */}
            {rules.length > 0 && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Eye" size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">
                    Preview
                  </span>
                </div>
                <p className="text-sm text-primary-600">
                  This segment would match approximately {calculateMatchingProspects(rules)} prospects
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
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
            Segments
          </h1>
          <p className="text-gray-600 mt-1">
            Organize prospects into targeted groups for {currentClient.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon="Plus"
          onClick={handleCreateSegment}
        >
          Create Segment
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Segments</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {segments.length}
              </p>
            </div>
            <ApperIcon name="Filter" size={24} className="text-primary-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Prospects Segmented</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {segments.reduce((sum, s) => sum + (s.prospects || 0), 0)}
              </p>
            </div>
            <ApperIcon name="Users" size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hot Leads</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {segments.find(s => s.name.toLowerCase().includes('hot'))?.prospects || 0}
              </p>
            </div>
            <ApperIcon name="Flame" size={24} className="text-red-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Segment Size</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {segments.length > 0
                  ? Math.round(segments.reduce((sum, s) => sum + (s.prospects || 0), 0) / segments.length)
                  : 0
                }
              </p>
            </div>
            <ApperIcon name="BarChart3" size={24} className="text-accent-600" />
          </div>
        </div>
      </div>
      
      {/* Segments Grid */}
      <AnimatePresence>
        {segments.length === 0 ? (
          <Empty
            title="No segments yet"
            message="Create your first segment to automatically organize prospects based on their behavior and attributes"
            icon="Filter"
            actionLabel="Create Segment"
            onAction={handleCreateSegment}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.Id}
                className="gradient-card rounded-xl p-6 hover:shadow-xl transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
                      {segment.name}
                    </h3>
                    <Badge variant="primary">
                      {segment.prospects || 0} prospects
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Edit"
                      onClick={() => handleEditSegment(segment)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Trash2"
                      onClick={() => handleDeleteSegment(segment)}
                    />
                  </div>
                </div>
                
                {/* Rules */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rules ({segment.rules?.length || 0})
                  </p>
                  {segment.rules?.slice(0, 2).map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                      {fieldOptions.find(f => f.value === rule.field)?.label} {' '}
                      {operatorOptions.find(o => o.value === rule.operator)?.label.toLowerCase()} {' '}
                      "{rule.value}"
                    </div>
                  ))}
                  {(segment.rules?.length || 0) > 2 && (
                    <p className="text-xs text-gray-500">
                      +{(segment.rules?.length || 0) - 2} more rules
                    </p>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    icon="Users"
                    className="flex-1"
                    onClick={() => toast.info('View prospects coming soon')}
                  >
                    View Prospects
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon="GitBranch"
                    onClick={() => toast.info('Add to sequence coming soon')}
                  >
                    Sequence
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Segments