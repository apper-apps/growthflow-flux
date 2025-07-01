import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ClientSwitcher = ({ clients = [], currentClient, onClientChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleClientSelect = (client) => {
    onClientChange?.(client)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 w-full p-3 rounded-lg bg-white border-2 border-gray-200 hover:border-primary-300 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {currentClient?.name?.charAt(0) || 'A'}
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="font-medium text-gray-900">
            {currentClient?.name || 'Select Client'}
          </p>
          <p className="text-sm text-gray-500">
            {clients.length} clients available
          </p>
        </div>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-gray-400" 
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {clients.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No clients available
              </div>
            ) : (
              clients.map((client) => (
                <motion.button
                  key={client.Id}
                  onClick={() => handleClientSelect(client)}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  whileHover={{ backgroundColor: '#f9fafb' }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.industry}</p>
                  </div>
                  {currentClient?.Id === client.Id && (
                    <ApperIcon name="Check" size={16} className="text-primary-600" />
                  )}
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ClientSwitcher