import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/organisms/Sidebar'
import Header from '@/components/organisms/Header'
import { clientService } from '@/services/api/clientService'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [clients, setClients] = useState([])
  const [currentClient, setCurrentClient] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadClients()
  }, [])
  
  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await clientService.getAll()
      setClients(data)
      if (data.length > 0) {
        setCurrentClient(data[0])
      }
    } catch (error) {
      console.error('Failed to load clients:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleClientChange = (client) => {
    setCurrentClient(client)
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSidebarToggle={toggleSidebar}
          clients={clients}
          currentClient={currentClient}
          onClientChange={handleClientChange}
        />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <Outlet context={{ currentClient, clients, loading }} />
        </main>
      </div>
    </div>
  )
}

export default Layout