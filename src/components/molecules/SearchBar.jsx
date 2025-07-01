import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search...", 
  filters = [],
  onFilterChange,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  
  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(searchTerm, activeFilters)
  }
  
  const handleFilterToggle = (filterKey, value) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: activeFilters[filterKey] === value ? undefined : value
    }
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }
  
  return (
    <motion.div 
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSearch} className="flex space-x-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon="Search"
            className="h-11"
          />
        </div>
        <Button type="submit" variant="primary" className="h-11">
          Search
        </Button>
      </form>
      
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div key={filter.key} className="flex space-x-1">
              {filter.options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleFilterToggle(filter.key, option.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border-2 transition-all duration-200 ${
                    activeFilters[filter.key] === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default SearchBar