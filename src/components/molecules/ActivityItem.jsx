import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Badge from '@/components/atoms/Badge'

const ActivityItem = ({ activity, index = 0 }) => {
  const getActivityIcon = (type) => {
    const icons = {
      email_open: 'Mail',
      email_click: 'MousePointer',
      website_visit: 'Globe',
      form_submit: 'FileText',
      sequence_start: 'Play',
      sequence_complete: 'CheckCircle'
    }
    return icons[type] || 'Activity'
  }
  
  const getActivityColor = (type) => {
    const colors = {
      email_open: 'primary',
      email_click: 'accent',
      website_visit: 'secondary',
      form_submit: 'success',
      sequence_start: 'info',
      sequence_complete: 'success'
    }
    return colors[type] || 'default'
  }
  
  const getActivityDescription = (activity) => {
    const descriptions = {
      email_open: `Opened "${activity.metadata?.subject || 'email'}"`,
      email_click: `Clicked link in "${activity.metadata?.subject || 'email'}"`,
      website_visit: `Visited ${activity.metadata?.page || 'website'}`,
      form_submit: `Submitted ${activity.metadata?.form || 'form'}`,
      sequence_start: `Started "${activity.metadata?.sequence || 'sequence'}"`,
      sequence_complete: `Completed "${activity.metadata?.sequence || 'sequence'}"`
    }
    return descriptions[activity.type] || activity.type
  }
  
  return (
    <motion.div
      className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
          <ApperIcon 
            name={getActivityIcon(activity.type)} 
            size={16} 
            className="text-white" 
          />
        </div>
        {index < 4 && (
          <div className="absolute top-8 left-1/2 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {getActivityDescription(activity)}
          </p>
          <Badge variant={getActivityColor(activity.type)} size="sm">
            {activity.type.replace('_', ' ')}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </p>
          
          {activity.metadata?.score && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="Zap" size={12} className="text-yellow-500" />
              <span className="text-xs font-medium text-gray-600">
                +{activity.metadata.score}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ActivityItem