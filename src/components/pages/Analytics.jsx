import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import MetricCard from '@/components/molecules/MetricCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { analyticsService } from '@/services/api/analyticsService'

const Analytics = () => {
  const { currentClient, loading: clientLoading } = useOutletContext()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRange, setTimeRange] = useState('30d')
  
  useEffect(() => {
    if (currentClient && !clientLoading) {
      loadAnalytics()
    }
  }, [currentClient, clientLoading, timeRange])
  
  const loadAnalytics = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await analyticsService.getAnalytics(currentClient.Id, timeRange)
      setAnalytics(data)
    } catch (err) {
      setError('Failed to load analytics')
      console.error('Analytics error:', err)
    } finally {
      setLoading(false)
    }
  }
  
  const engagementChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
      background: 'transparent'
    },
    colors: ['#5E3FBE', '#E91E63', '#00BCD4'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        gradientToColors: ['#E91E63', '#00BCD4', '#5E3FBE'],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}%`
      }
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 3
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val}%`
      }
    }
  }
  
  const engagementChartSeries = [
    {
      name: 'Email Opens',
      data: [45, 52, 48, 61]
    },
    {
      name: 'Link Clicks',
      data: [12, 18, 15, 24]
    },
    {
      name: 'Replies',
      data: [8, 12, 9, 16]
    }
  ]
  
  const conversionFunnelOptions = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: { show: false }
    },
    colors: ['#5E3FBE'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true,
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`
    },
    xaxis: {
      categories: ['Prospects Added', 'Emails Sent', 'Emails Opened', 'Links Clicked', 'Replied', 'Converted']
    },
    grid: {
      borderColor: '#f1f5f9'
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val}%`
      }
    }
  }
  
  const conversionFunnelSeries = [{
    name: 'Conversion Rate',
    data: [100, 85, 52, 24, 16, 8]
  }]
  
  if (clientLoading || loading) {
    return <Loading type="dashboard" />
  }
  
  if (error) {
    return <Error message={error} onRetry={loadAnalytics} />
  }
  
  if (!currentClient) {
    return (
      <Empty
        title="No client selected"
        message="Please select a client to view their analytics"
        icon="Building"
      />
    )
  }
  
  if (!analytics) {
    return (
      <Empty
        title="No analytics data"
        message="Start sending sequences to see engagement analytics"
        icon="BarChart3"
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
            Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track performance and engagement for {currentClient.name}
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Prospects"
          value="1,247"
          change="+12%"
          changeType="positive"
          icon="Users"
          gradient="primary"
        />
        <MetricCard
          title="Email Open Rate"
          value="52.3%"
          change="+8.2%"
          changeType="positive"
          icon="Mail"
          gradient="secondary"
        />
        <MetricCard
          title="Click Rate"
          value="18.7%"
          change="+3.1%"
          changeType="positive"
          icon="MousePointer"
          gradient="accent"
        />
        <MetricCard
          title="Conversion Rate"
          value="8.4%"
          change="+1.9%"
          changeType="positive"
          icon="Target"
          gradient="success"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Engagement Trends
          </h3>
          <Chart
            options={engagementChartOptions}
            series={engagementChartSeries}
            type="line"
            height={350}
          />
        </motion.div>
        
        {/* Conversion Funnel */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Conversion Funnel
          </h3>
          <Chart
            options={conversionFunnelOptions}
            series={conversionFunnelSeries}
            type="bar"
            height={400}
          />
        </motion.div>
      </div>
      
      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Sequences */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Top Sequences
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Welcome Series', openRate: 68, prospects: 245 },
              { name: 'Product Demo', openRate: 52, prospects: 189 },
              { name: 'Follow-up', openRate: 41, prospects: 156 }
            ].map((sequence, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sequence.name}</p>
                  <p className="text-sm text-gray-500">{sequence.prospects} prospects</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary-600">
                    {sequence.openRate}%
                  </p>
                  <p className="text-xs text-gray-500">open rate</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Activity Heatmap */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Activity Heatmap
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  Math.random() > 0.7 ? 'bg-primary-500' :
                  Math.random() > 0.4 ? 'bg-primary-300' :
                  Math.random() > 0.2 ? 'bg-primary-100' : 'bg-gray-100'
                }`}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <div className="w-3 h-3 bg-primary-100 rounded"></div>
              <div className="w-3 h-3 bg-primary-300 rounded"></div>
              <div className="w-3 h-3 bg-primary-500 rounded"></div>
            </div>
            <span>More</span>
          </div>
        </motion.div>
        
        {/* Engagement Score Distribution */}
        <motion.div
          className="gradient-card rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
            Score Distribution
          </h3>
          <div className="space-y-3">
            {[
              { range: '80-100', count: 156, color: 'bg-green-500' },
              { range: '60-79', count: 234, color: 'bg-yellow-500' },
              { range: '40-59', count: 189, color: 'bg-orange-500' },
              { range: '20-39', count: 98, color: 'bg-red-500' },
              { range: '0-19', count: 45, color: 'bg-gray-500' }
            ].map((segment, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded ${segment.color}`}></div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {segment.range}
                  </span>
                  <span className="text-sm text-gray-500">
                    {segment.count} prospects
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Analytics