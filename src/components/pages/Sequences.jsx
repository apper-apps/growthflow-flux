import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import SequenceBuilder from '@/components/organisms/SequenceBuilder'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import { sequenceService } from '@/services/api/sequenceService'

const Sequences = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [sequences, setSequences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingSequence, setEditingSequence] = useState(null)
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadSequences()
    }
  }, [currentClient, clientLoading])
  
  const loadSequences = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await sequenceService.getByClient(currentClient.Id)
      setSequences(data)
    } catch (err) {
      setError('Failed to load sequences')
      console.error('Sequences error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCreateSequence = () => {
    setEditingSequence(null)
    setShowBuilder(true)
  }
  
  const handleEditSequence = (sequence) => {
    setEditingSequence(sequence)
    setShowBuilder(true)
  }
  
  const handleSaveSequence = async (sequenceData) => {
    try {
      if (editingSequence) {
        await sequenceService.update(editingSequence.Id, {
          ...sequenceData,
          clientId: currentClient.Id
        })
        toast.success('Sequence updated successfully')
      } else {
        await sequenceService.create({
          ...sequenceData,
          clientId: currentClient.Id,
          status: 'draft',
          metrics: {
            totalProspects: 0,
            activeProspects: 0,
            completedProspects: 0,
            openRate: 0,
            clickRate: 0
          }
        })
        toast.success('Sequence created successfully')
      }
      setShowBuilder(false)
      loadSequences()
    } catch (error) {
      toast.error('Failed to save sequence')
    }
  }
  
  const handleDeleteSequence = async (sequence) => {
    if (window.confirm(`Are you sure you want to delete "${sequence.name}"?`)) {
      try {
        await sequenceService.delete(sequence.Id)
        toast.success('Sequence deleted successfully')
        loadSequences()
      } catch (error) {
        toast.error('Failed to delete sequence')
      }
    }
  }
  
  const handleToggleSequence = async (sequence) => {
    try {
      const newStatus = sequence.status === 'active' ? 'paused' : 'active'
      await sequenceService.update(sequence.Id, { status: newStatus })
      toast.success(`Sequence ${newStatus === 'active' ? 'activated' : 'paused'}`)
      loadSequences()
    } catch (error) {
      toast.error('Failed to update sequence status')
    }
  }
  
  const getStatusBadgeVariant = (status) => {
    const variants = {
      active: 'success',
      paused: 'warning',
      draft: 'default',
      completed: 'accent'
    }
    return variants[status] || 'default'
  }
  
  if (clientLoading || loading) {
    return <Loading type="cards" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadSequences} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client to view their sequences"
        icon="Building"
      />
    )
  }
  
  if (showBuilder) {
    return (
      <SequenceBuilder
        sequence={editingSequence}
        onSave={handleSaveSequence}
        onCancel={() => setShowBuilder(false)}
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
            Sequences
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage nurturing workflows for {currentClient.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon="Plus"
          onClick={handleCreateSequence}
        >
          Create Sequence
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sequences</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sequences.length}
              </p>
            </div>
            <ApperIcon name="GitBranch" size={24} className="text-primary-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sequences.filter(s => s.status === 'active').length}
              </p>
            </div>
            <ApperIcon name="Play" size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Prospects</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sequences.reduce((sum, s) => sum + (s.metrics?.totalProspects || 0), 0)}
              </p>
            </div>
            <ApperIcon name="Users" size={24} className="text-accent-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sequences.length > 0
                  ? Math.round(sequences.reduce((sum, s) => sum + (s.metrics?.openRate || 0), 0) / sequences.length)
                  : 0
                }%
              </p>
            </div>
            <ApperIcon name="Mail" size={24} className="text-secondary-600" />
          </div>
        </div>
      </div>
      
      {/* Sequences Grid */}
      <AnimatePresence>
        {sequences.length === 0 ? (
          <Empty
            title="No sequences yet"
            message="Create your first nurturing sequence to start automating your prospect outreach"
            icon="GitBranch"
            actionLabel="Create Sequence"
            onAction={handleCreateSequence}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sequences.map((sequence, index) => (
              <motion.div
                key={sequence.Id}
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
                      {sequence.name}
                    </h3>
                    <Badge variant={getStatusBadgeVariant(sequence.status)}>
                      {sequence.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Edit"
                      onClick={() => handleEditSequence(sequence)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Trash2"
                      onClick={() => handleDeleteSequence(sequence)}
                    />
                  </div>
                </div>
                
                {/* Steps count */}
                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name="Layers" size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {sequence.steps?.length || 0} steps
                  </span>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Prospects</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {sequence.metrics?.totalProspects || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Open Rate</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {sequence.metrics?.openRate || 0}%
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={sequence.status === 'active' ? 'secondary' : 'primary'}
                    icon={sequence.status === 'active' ? 'Pause' : 'Play'}
                    onClick={() => handleToggleSequence(sequence)}
                    className="flex-1"
                  >
                    {sequence.status === 'active' ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon="BarChart3"
                    onClick={() => toast.info('Analytics coming soon')}
                  >
                    Stats
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

export default Sequences