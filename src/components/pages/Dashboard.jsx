import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import MetricCard from '@/components/molecules/MetricCard'
import ActivityItem from '@/components/molecules/ActivityItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { dashboardService } from '@/services/api/dashboardService'
import { activityService } from '@/services/api/activityService'

const Dashboard = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [metrics, setMetrics] = useState([])
  const [activities, setActivities] = useState([])
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadDashboardData()
    }
  }, [currentClient, clientLoading])
  
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [metricsData, activitiesData] = await Promise.all([
        dashboardService.getMetrics(currentClient.Id),
        activityService.getRecent(currentClient.Id)
      ])
      
      setMetrics(metricsData)
      setActivities(activitiesData)
      setChartData(generateChartData(metricsData))
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const generateChartData = (metricsData) => {
    return {
      series: [{
        name: 'Engagement Score',
        data: [65, 70, 75, 80, 85, 82, 88]
      }],
      options: {
        chart: {
          type: 'area',
          height: 300,
          toolbar: { show: false },
          background: 'transparent'
        },
        colors: ['#5E3FBE'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.1,
            gradientToColors: ['#E91E63'],
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0.1,
          }
        },
        dataLabels: { enabled: false },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: {
          show: true,
          labels: {
            formatter: (val) => `${val}%`
          }
        },
        grid: {
          borderColor: '#f1f5f9',
          strokeDashArray: 3
        },
        tooltip: {
          theme: 'light',
          y: {
            formatter: (val) => `${val}%`
          }
        }
      }
    }
  }
  
  if (clientLoading || loading) {
    return <Loading type="dashboard" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client from the dropdown to view their dashboard"
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
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with {currentClient.name} today
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            className="p-3 rounded-lg bg-white border border-gray-200 hover:border-primary-300 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Download" size={20} className="text-gray-600" />
          </motion.button>
          <motion.button
            className="gradient-button px-4 py-3 rounded-lg font-medium text-white flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Plus" size={18} />
            <span>New Campaign</span>
          </motion.button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              gradient={metric.gradient}
              subtitle={metric.subtitle}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Chart */}
        <div className="lg:col-span-2">
          <motion.div
            className="gradient-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-gray-900">
                Engagement Trends
              </h3>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            
            {chartData && (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={300}
              />
            )}
          </motion.div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <motion.div
            className="gradient-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-gray-900">
                Recent Activity
              </h3>
              <ApperIcon name="Activity" size={20} className="text-gray-400" />
            </div>
            
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="Activity" size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No recent activity</p>
                </div>
              ) : (
                activities.map((activity, index) => (
                  <ActivityItem 
                    key={activity.Id} 
                    activity={activity} 
                    index={index}
                  />
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <div className="gradient-card rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Import Prospects</h4>
              <p className="text-sm text-gray-500">Add new leads to your pipeline</p>
            </div>
          </div>
        </div>
        
        <div className="gradient-card rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <ApperIcon name="GitBranch" size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Create Sequence</h4>
              <p className="text-sm text-gray-500">Build nurturing workflows</p>
            </div>
          </div>
        </div>
        
        <div className="gradient-card rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <ApperIcon name="Filter" size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Build Segments</h4>
              <p className="text-sm text-gray-500">Target specific audiences</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard