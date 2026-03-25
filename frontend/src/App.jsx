import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './User/Landing'
import Community from './User/Community'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/communities' element={<Community />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App