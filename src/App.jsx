import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import Prospects from '@/components/pages/Prospects'
import Sequences from '@/components/pages/Sequences'
import Segments from '@/components/pages/Segments'
import Analytics from '@/components/pages/Analytics'
import Settings from '@/components/pages/Settings'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prospects" element={<Prospects />} />
          <Route path="sequences" element={<Sequences />} />
          <Route path="segments" element={<Segments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-50"
        theme="light"
      />
    </>
  )
}

export default App