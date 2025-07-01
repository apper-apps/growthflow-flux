import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ProspectTable = ({ prospects = [], onEdit, onDelete, onBulkAction }) => {
  const [selectedProspects, setSelectedProspects] = useState([])
  const [sortField, setSortField] = useState('score')
  const [sortDirection, setSortDirection] = useState('desc')
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProspects(prospects.map(p => p.Id))
    } else {
      setSelectedProspects([])
    }
  }
  
  const handleSelectProspect = (prospectId) => {
    setSelectedProspects(prev => 
      prev.includes(prospectId)
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    )
  }
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const sortedProspects = [...prospects].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    
    if (sortField === 'lastActivity') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return 'success'
    if (score >= 50) return 'warning'
    return 'danger'
  }
  
  const getStatusBadgeVariant = (status) => {
    const variants = {
      active: 'success',
      nurturing: 'primary',
      cold: 'danger',
      converted: 'accent'
    }
    return variants[status] || 'default'
  }
  
  return (
    <div className="space-y-4">
      {/* Bulk actions */}
      {selectedProspects.length > 0 && (
        <motion.div
          className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-medium text-primary-700">
            {selectedProspects.length} prospect{selectedProspects.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onBulkAction?.('addToSequence', selectedProspects)}
            >
              Add to Sequence
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onBulkAction?.('changeSegment', selectedProspects)}
            >
              Change Segment
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onBulkAction?.('delete', selectedProspects)}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedProspects.length === prospects.length && prospects.length > 0}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Prospect</span>
                    <ApperIcon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Score</span>
                    <ApperIcon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('segment')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Segment</span>
                    <ApperIcon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('sequenceStatus')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ApperIcon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('lastActivity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Activity</span>
                    <ApperIcon name="ArrowUpDown" size={14} />
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProspects.map((prospect, index) => (
                <motion.tr
                  key={prospect.Id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProspects.includes(prospect.Id)}
                      onChange={() => handleSelectProspect(prospect.Id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {prospect.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{prospect.email}</p>
                        <p className="text-sm text-gray-500">{prospect.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getScoreBadgeVariant(prospect.score)}>
                      {prospect.score}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="primary">{prospect.segment}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusBadgeVariant(prospect.sequenceStatus?.status)}>
                      {prospect.sequenceStatus?.status || 'Not in sequence'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {prospect.lastActivity 
                      ? formatDistanceToNow(new Date(prospect.lastActivity), { addSuffix: true })
                      : 'No activity'
                    }
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Eye"
                      onClick={() => onEdit?.(prospect)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      icon="Trash2"
onClick={() => onDelete?.(prospect)}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProspectTable