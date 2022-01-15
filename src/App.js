
import './App.css'
import Login from './components/Login'
import ChatRoom from './components/ChatRoom'
import {Route, Routes} from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import AppProvider from './context/AppProvider'
import AddRoomModal from './components/Modals/AddRoomModal'
import InviteMemberModal from './components/Modals/InviteMemberModal'

function App() {
  return(
    <AuthProvider>
    <AppProvider>
      <Routes>
        <Route element={<Login/>} path='/login' />     
        <Route element={<ChatRoom/>} path='/' />
      </Routes>
      <AddRoomModal />
      <InviteMemberModal />
    </AppProvider>
  </AuthProvider>
  )
    
}

export default App
