import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './User/Landing'
import Community from './User/Community'
import UserDashboard from './User/UserDashboard'
import Profile from './User/Profile'
import UserSettings from './User/UserSettings'
import CommunityDetail from './User/CommunityDetail'
import ProjectsBoard from './User/ProjectsBoard'
import ProjectDetail from './User/ProjectDetail'
import ProjectCreate from './User/ProjectCreate'
import UserWorkspace from './User/UserWorkspace'
import ApplicationManagement from './User/ApplicationManagement'
import About from './UserComponents/About'
import Contact from './UserComponents/Contact'
import Team from './User/Team'
import Privacy from './UserComponents/Privacy'
import Terms from './UserComponents/Terms'
import UserLogin from './User/UserLogin'
import Signup from './User/UserSignup'

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
          <Route path='/communities/:id' element={<CommunityDetail />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/settings' element={<UserSettings />} />
          <Route path='/projects' element={<ProjectsBoard />} />
          <Route path='/projects/create' element={<ProjectCreate />} />
          <Route path='/projects/:id' element={<ProjectDetail />} />
          <Route path='/projects/:id/applications' element={<ApplicationManagement />} />
          <Route path='/workspace/:id' element={<UserWorkspace />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/team' element={<Team />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/signup' element={<Signup />} />

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