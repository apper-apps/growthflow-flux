import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'

const SequenceBuilder = ({ sequence, onSave, onCancel }) => {
  const [steps, setSteps] = useState(sequence?.steps || [])
  const [sequenceName, setSequenceName] = useState(sequence?.name || '')
  const [showStepModal, setShowStepModal] = useState(false)
  const [editingStep, setEditingStep] = useState(null)
  
  const stepTypes = [
    { type: 'email', icon: 'Mail', label: 'Email', color: 'primary' },
    { type: 'wait', icon: 'Clock', label: 'Wait', color: 'accent' },
    { type: 'condition', icon: 'GitMerge', label: 'Condition', color: 'warning' }
  ]
  
  const addStep = (type) => {
    const newStep = {
      id: Date.now(),
      type,
      order: steps.length,
      config: getDefaultStepConfig(type)
    }
    setSteps([...steps, newStep])
    setEditingStep(newStep)
    setShowStepModal(true)
  }
  
  const getDefaultStepConfig = (type) => {
    switch (type) {
      case 'email':
        return {
          subject: '',
          template: '',
          delay: { value: 0, unit: 'days' }
        }
      case 'wait':
        return {
          delay: { value: 1, unit: 'days' }
        }
      case 'condition':
        return {
          condition: 'email_opened',
          trueAction: 'continue',
          falseAction: 'wait'
        }
      default:
        return {}
    }
  }
  
  const updateStep = (stepId, config) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, config } : step
    ))
  }
  
  const deleteStep = (stepId) => {
    setSteps(prev => prev.filter(step => step.id !== stepId))
  }
  
  const handleDragEnd = (result) => {
    if (!result.destination) return
    
    const reorderedSteps = Array.from(steps)
    const [removed] = reorderedSteps.splice(result.source.index, 1)
    reorderedSteps.splice(result.destination.index, 0, removed)
    
    const updatedSteps = reorderedSteps.map((step, index) => ({
      ...step,
      order: index
    }))
    
    setSteps(updatedSteps)
  }
  
  const handleSave = () => {
    onSave?.({
      name: sequenceName,
      steps: steps.map((step, index) => ({ ...step, order: index }))
    })
  }
  
  const getStepIcon = (type) => {
    const stepType = stepTypes.find(st => st.type === type)
    return stepType?.icon || 'Circle'
  }
  
  const getStepColor = (type) => {
    const stepType = stepTypes.find(st => st.type === type)
    return stepType?.color || 'default'
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Sequence name"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            className="text-lg font-medium"
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!sequenceName.trim()}>
            Save Sequence
          </Button>
        </div>
      </div>
      
      {/* Step Types */}
      <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Add step:</span>
        {stepTypes.map((stepType) => (
          <Button
            key={stepType.type}
            size="sm"
            variant="outline"
            icon={stepType.icon}
            onClick={() => addStep(stepType.type)}
          >
            {stepType.label}
          </Button>
        ))}
      </div>
      
      {/* Sequence Flow */}
      <div className="gradient-card rounded-xl p-6 min-h-96">
        {steps.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ApperIcon name="GitBranch" size={48} className="mb-4" />
            <h3 className="text-lg font-medium mb-2">No steps yet</h3>
            <p className="text-sm">Add your first step to get started</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sequence-steps">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {steps.map((step, index) => (
                    <Draggable
                      key={step.id}
                      draggableId={step.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`relative ${snapshot.isDragging ? 'z-50' : ''}`}
                        >
                          <motion.div
                            className={`flex items-center space-x-4 p-4 bg-white border-2 rounded-lg transition-all duration-200 ${
                              snapshot.isDragging 
                                ? 'border-primary-500 shadow-lg' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            whileHover={{ scale: 1.01 }}
                          >
                            {/* Drag handle */}
                            <div 
                              {...provided.dragHandleProps}
                              className="cursor-move p-1"
                            >
                              <ApperIcon name="GripVertical" size={16} className="text-gray-400" />
                            </div>
                            
                            {/* Step number */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            
                            {/* Step icon */}
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <ApperIcon 
                                name={getStepIcon(step.type)} 
                                size={20} 
                                className="text-gray-600" 
                              />
                            </div>
                            
                            {/* Step details */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant={getStepColor(step.type)}>
                                  {step.type}
                                </Badge>
                                {step.type === 'email' && step.config.subject && (
                                  <span className="text-sm font-medium text-gray-900">
                                    {step.config.subject}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {getStepDescription(step)}
                              </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                icon="Edit"
                                onClick={() => {
                                  setEditingStep(step)
                                  setShowStepModal(true)
                                }}
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                icon="Trash2"
                                onClick={() => deleteStep(step.id)}
                              />
                            </div>
                          </motion.div>
                          
                          {/* Connection line */}
                          {index < steps.length - 1 && (
                            <div className="flex justify-center py-2">
                              <div className="w-0.5 h-6 bg-gray-300"></div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  )
}

const getStepDescription = (step) => {
  switch (step.type) {
    case 'email':
      return `Send email after ${step.config.delay.value} ${step.config.delay.unit}`
    case 'wait':
      return `Wait ${step.config.delay.value} ${step.config.delay.unit}`
    case 'condition':
      return `Check if ${step.config.condition.replace('_', ' ')}`
    default:
      return step.type
  }
}

export default SequenceBuilder