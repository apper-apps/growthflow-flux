import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon, 
  gradient = 'default',
  subtitle,
  className = '' 
}) => {
  const gradients = {
    default: 'from-white to-gray-50/50',
    primary: 'from-primary-50/30 to-primary-100/20',
    secondary: 'from-secondary-50/30 to-secondary-100/20',
    accent: 'from-accent-50/30 to-accent-100/20',
    success: 'from-green-50/30 to-green-100/20',
    warning: 'from-yellow-50/30 to-yellow-100/20'
  }
  
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }
  
  const changeIcons = {
    positive: 'TrendingUp',
    negative: 'TrendingDown',
    neutral: 'Minus'
  }
  
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradients[gradient]} border border-gray-200/60 rounded-xl p-6 shadow-lg shadow-gray-500/5 hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-200 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-display font-bold text-gray-900 mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        
        {icon && (
          <div className="ml-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <ApperIcon name={icon} size={24} className="text-white" />
            </div>
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={`flex items-center space-x-1 mt-4 ${changeColors[changeType]}`}>
          <ApperIcon name={changeIcons[changeType]} size={16} />
          <span className="text-sm font-medium">{change}</span>
          <span className="text-sm text-gray-500">vs last period</span>
        </div>
      )}
    </motion.div>
  )
}

export default MetricCard