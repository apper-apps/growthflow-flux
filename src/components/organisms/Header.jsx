import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ClientSwitcher from '@/components/molecules/ClientSwitcher'

const Header = ({ onSidebarToggle, clients, currentClient, onClientChange }) => {
  return (
    <motion.header
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
          >
            <ApperIcon name="Menu" size={20} className="text-gray-600" />
          </button>
          
          {/* Client switcher */}
          <div className="w-80">
            <ClientSwitcher
              clients={clients}
              currentClient={currentClient}
              onClientChange={onClientChange}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Bell" size={20} className="text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full"></div>
          </motion.button>
          
          {/* Help */}
          <motion.button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="HelpCircle" size={20} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header