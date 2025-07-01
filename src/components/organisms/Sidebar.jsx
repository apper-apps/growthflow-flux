import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { name: 'Prospects', path: '/prospects', icon: 'Users' },
    { name: 'Sequences', path: '/sequences', icon: 'GitBranch' },
    { name: 'Segments', path: '/segments', icon: 'Filter' },
    { name: 'Analytics', path: '/analytics', icon: 'BarChart3' },
    { name: 'Settings', path: '/settings', icon: 'Settings' }
  ]
  
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg lg:shadow-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={false}
        animate={{
          x: isOpen ? 0 : window.innerWidth >= 1024 ? 0 : -256
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900">
                  GrowthFlow
                </h1>
                <p className="text-xs text-gray-500">Pro</p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path
              
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                >
                  {({ isActive }) => (
                    <motion.div
                      className="flex items-center space-x-3 w-full"
                      whileHover={{ x: isActive ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ApperIcon name={item.icon} size={20} />
                      <span>{item.name}</span>
                    </motion.div>
                  )}
                </NavLink>
              )
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <ApperIcon name="User" size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Agency Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@agency.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar