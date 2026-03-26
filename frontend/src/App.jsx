import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './User/Landing'
import Community from './User/Community'

import AdminLayout from './AdminComponents/AdminSidebar'
import AdminDashboard from './Admin/AdminDashboard'
import AdminUsersManagement from './Admin/AdminUsersManagement'
import AdminCommunities from './Admin/AdminCommunities'
import AdminProjects from './Admin/AdminProjects'
import AdminTeams from './Admin/AdminTeams'
import AdminReports from './Admin/AdminReports'
import AdminNotifications from './Admin/AdminNotifications'
import AdminSettings from './Admin/AdminSettings'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Landing />} />
          <Route path='/communities' element={<Community />} />

          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='users' element={<AdminUsersManagement />} />
            <Route path='communities' element={<AdminCommunities />} />
            <Route path='projects' element={<AdminProjects />} />
            <Route path='teams' element={<AdminTeams />} />
            <Route path='reports' element={<AdminReports />} />
            <Route path='notifications' element={<AdminNotifications />} />
            <Route path='settings' element={<AdminSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App