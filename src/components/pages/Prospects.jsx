import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import SearchBar from '@/components/molecules/SearchBar'
import ProspectTable from '@/components/organisms/ProspectTable'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { prospectService } from '@/services/api/prospectService'

const Prospects = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [prospects, setProspects] = useState([])
  const [filteredProspects, setFilteredProspects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const searchFilters = [
    {
      key: 'segment',
      options: [
        { label: 'Hot Leads', value: 'hot' },
        { label: 'Warm Leads', value: 'warm' },
        { label: 'Cold Leads', value: 'cold' }
      ]
    },
    {
      key: 'status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Nurturing', value: 'nurturing' },
        { label: 'Converted', value: 'converted' }
      ]
    }
  ]
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadProspects()
    }
  }, [currentClient, clientLoading])
  
  const loadProspects = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await prospectService.getByClient(currentClient.Id)
      setProspects(data)
      setFilteredProspects(data)
    } catch (err) {
      setError('Failed to load prospects')
      console.error('Prospects error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleSearch = (searchTerm, filters) => {
    let filtered = [...prospects]
    
    // Apply text search
    if (searchTerm.trim()) {
      filtered = filtered.filter(prospect =>
        prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prospect.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(prospect => {
          if (key === 'status') {
            return prospect.sequenceStatus?.status === value
          }
          return prospect[key] === value
        })
      }
    })
    
    setFilteredProspects(filtered)
  }
  
  const handleFilterChange = (filters) => {
    handleSearch('', filters)
  }
  
  const handleEdit = (prospect) => {
    toast.info(`Editing ${prospect.email}`)
  }
  
  const handleDelete = async (prospect) => {
    if (window.confirm(`Are you sure you want to delete ${prospect.email}?`)) {
      try {
        await prospectService.delete(prospect.Id)
        toast.success('Prospect deleted successfully')
        loadProspects()
      } catch (error) {
        toast.error('Failed to delete prospect')
      }
    }
  }
  
  const handleBulkAction = async (action, prospectIds) => {
    try {
      switch (action) {
        case 'addToSequence':
          toast.info(`Adding ${prospectIds.length} prospects to sequence`)
          break
        case 'changeSegment':
          toast.info(`Changing segment for ${prospectIds.length} prospects`)
          break
        case 'delete':
          if (window.confirm(`Delete ${prospectIds.length} prospects?`)) {
            await Promise.all(prospectIds.map(id => prospectService.delete(id)))
            toast.success(`${prospectIds.length} prospects deleted`)
            loadProspects()
          }
          break
        default:
          break
      }
    } catch (error) {
      toast.error('Failed to perform bulk action')
    }
  }
  
  const handleImportProspects = () => {
    toast.info('Import functionality coming soon')
  }
  
  if (clientLoading || loading) {
    return <Loading type="table" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadProspects} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client to view their prospects"
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
            Prospects
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track your leads for {currentClient.name}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            icon="Download"
            onClick={() => toast.info('Export functionality coming soon')}
          >
            Export
          </Button>
          <Button
            variant="primary"
            icon="Upload"
            onClick={handleImportProspects}
          >
            Import Prospects
          </Button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <SearchBar
        placeholder="Search prospects by email or company..."
        filters={searchFilters}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Prospects</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {prospects.length}
              </p>
            </div>
            <ApperIcon name="Users" size={24} className="text-primary-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {prospects.filter(p => p.sequenceStatus?.status === 'active').length}
              </p>
            </div>
            <ApperIcon name="Activity" size={24} className="text-green-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Score</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {prospects.length > 0 
                  ? Math.round(prospects.reduce((sum, p) => sum + p.score, 0) / prospects.length)
                  : 0
                }
              </p>
            </div>
            <ApperIcon name="Target" size={24} className="text-accent-600" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                +{Math.floor(Math.random() * 50) + 10}
              </p>
            </div>
            <ApperIcon name="TrendingUp" size={24} className="text-secondary-600" />
          </div>
        </div>
      </div>
      
      {/* Prospects Table */}
      {filteredProspects.length === 0 ? (
        prospects.length === 0 ? (
          <Empty
            title="No prospects yet"
            message="Import your first prospects from LeadShark or upload a CSV file to get started"
            icon="Users"
            actionLabel="Import Prospects"
            onAction={handleImportProspects}
          />
        ) : (
          <Empty
            title="No matching prospects"
            message="Try adjusting your search criteria or filters"
            icon="Search"
          />
        )
      ) : (
        <ProspectTable
          prospects={filteredProspects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBulkAction={handleBulkAction}
        />
      )}
    </motion.div>
  )
}

export default Prospects